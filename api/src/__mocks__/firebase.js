// Auto-mock for ../config/firebase.js
const db = {
  data: { users: {} },
  ref: jest.fn((path) => {
    const getNode = () => db.data[path] || {};
    return {
      once: jest.fn(() =>
        Promise.resolve({ val: () => getNode(), exists: () => !!Object.keys(getNode()).length })
      ),
      push: jest.fn(() => {
        const id = 'mock-' + Math.random().toString(36).slice(2);
        return {
          key: id,
          set: jest.fn((val) => {
            db.data[path][id] = val;
            return Promise.resolve();
          }),
        };
      }),
      child: jest.fn((id) => ({
        once: jest.fn(() =>
          Promise.resolve({
            exists: () => !!db.data[path][id],
            val: () => db.data[path][id],
          })
        ),
        update: jest.fn((patch) => {
          db.data[path][id] = { ...db.data[path][id], ...patch };
          return Promise.resolve();
        }),
        remove: jest.fn(() => {
          delete db.data[path][id];
          return Promise.resolve();
        }),
      })),
      set: jest.fn((val) => {
        db.data[path] = val;
        return Promise.resolve();
      }),
    };
  }),
};

module.exports = { db, usersRef: db.ref('users') };
