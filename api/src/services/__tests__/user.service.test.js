const userService = require('../user.service');

describe('user.service', () => {
  it('creates and fetches a user', async () => {
    const payload = { name: 'Alice', zip: '10001' };

    const created = await userService.createUser(payload);

    expect(created).toHaveProperty('id');
    expect(created.name).toBe('Alice');
    expect(created.zipCode).toBe('10001');

    const fetched = await userService.getUserById(created.id);
    expect(fetched).toEqual(created);
  });

  it('updates a user name', async () => {
    const { id } = await userService.createUser({ name: 'Bob', zip: '90210' });

    const updated = await userService.updateUser(id, { name: 'Bobby' });
    expect(updated.name).toBe('Bobby');
  });

  it('deletes a user', async () => {
    const { id } = await userService.createUser({ name: 'Eve', zip: '33101' });

    await userService.deleteUser(id);
    const gone = await userService.getUserById(id);
    expect(gone).toBeNull();
  });
});
