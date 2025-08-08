
const BASE =

  process.env.REACT_APP_API_BASE_URL


/* -------- Helpers ------------------------------------------------------- */

async function http(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    // Try to parse error JSON; fall back to status text
    let message = res.statusText;
    try {
      const { error, details } = await res.json();
      message = `${error}${details ? ': ' + details.join(', ') : ''}`;
    } catch (_) {
      /* ignore JSON parse failures */
    }
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  // No content (DELETE) ⇒ return void
  return res.status === 204 ? null : res.json();
}

/* -------- CRUD wrappers ------------------------------------------------- */

export function listUsers() {
  return http('GET', `${BASE}/users`);
}

export function createUser({ name, zip }) {
  return http('POST', `${BASE}/users`, { name, zip });
}

export function updateUser(id, patch) {
  return http('PUT', `${BASE}/users/${id}`, patch);
}

export function deleteUser(id) {
  return http('DELETE', `${BASE}/users/${id}`);
}

/* -------- Bonus: local time -------------------------------------------- */

export function fetchLocalTime(id) {
  return http('GET', `${BASE}/users/${id}/localtime`);
}
