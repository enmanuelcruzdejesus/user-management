const { usersRef } = require('../config/firebase');
const { enrichLocation } = require('./geocode.service');

/** List all users */
async function listUsers() {
  const snap = await usersRef.once('value');
  return Object.values(snap.val() || {});
}

/** Get a single user (returns null if not found) */
async function getUserById(id) {
  const snap = await usersRef.child(id).once('value');
  return snap.exists() ? snap.val() : null;
}

/** Create user — payload should contain { name, zip } */
async function createUser({ name, zip }) {
  if (!name || !zip) {
    const err = new Error('Both name and zip are required');
    err.status = 400;
    throw err;
  }

  // Enrich with lat, lon, timezone
  const location = await enrichLocation(zip);

  // Let Firebase assign the ID
  const ref = usersRef.push();
  const id = ref.key;

  const user = {
    id,
    name,
    zipCode: zip,
    ...location,
  };

  await ref.set(user);
  return user;
}

/** Update user — payload may include name and/or zip */
async function updateUser(id, payload) {
  const snap = await usersRef.child(id).once('value');
  if (!snap.exists()) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  let updated = { ...snap.val() };

  if (payload.name) updated.name = payload.name;
  if (payload.zip) {
    updated.zipCode = payload.zip;
    const loc = await enrichLocation(payload.zip);
    updated = { ...updated, ...loc };
  }

  await usersRef.child(id).update(updated);
  return updated;
}

/** Delete a user */
async function deleteUser(id) {
  await usersRef.child(id).remove();
}

async function listUsersPaginated({ limit = 10, page = 1, cursor }) {
  limit = Number(limit);
  if (limit <= 0) limit = 10;

  // ──────────────────────────────────────────────────────────
  // Cursor-based (preferred for large lists)
  //   /users?cursor=<last-id>&limit=10
  //   -> returns the next batch starting after cursor
  // ──────────────────────────────────────────────────────────
  if (cursor) {
    const snap = await usersRef
      .orderByKey()
      .startAfter(cursor)
      .limitToFirst(limit)
      .once('value');

    const data = snap.val() || {};
    const ids = Object.keys(data);
    return {
      users: Object.values(data),
      nextCursor: ids.length === limit ? ids[ids.length - 1] : null,
    };
  }

  // ──────────────────────────────────────────────────────────
  // Offset pagination (page/limit). Simpler but scans N rows.
  //   /users?page=2&limit=10
  // ──────────────────────────────────────────────────────────
  const offset = (Number(page) - 1) * limit;
  const snap   = await usersRef.once('value');
  const all    = Object.values(snap.val() || {});

  return {
    users: all.slice(offset, offset + limit),
    total: all.length,
    page: Number(page),
    pages: Math.ceil(all.length / limit),
  };
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  listUsersPaginated
};