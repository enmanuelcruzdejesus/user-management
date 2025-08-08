import { useState } from 'react';
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useLocalTime,
} from '../hooks/useUsers';

import Spinner   from '../components/Spinner';
import UserCard  from '../components/UserCard';
import UserForm  from '../components/UserForm';

export default function UsersPage() {
  const { data: users = [], isLoading } = useUsers();
  const createMut = useCreateUser();
  const updateMut = useUpdateUser();
  const deleteMut = useDeleteUser();

  const [editing, setEditing]     = useState(null);
  const [timeUserId, setTimeId]   = useState(null);
  const { data: localTime }       = useLocalTime(timeUserId, { enabled: !!timeUserId });

  /* handlers */
  const addUser    = payload => createMut.mutateAsync(payload);
  const saveUser   = payload => updateMut.mutateAsync({ id: editing.id, patch: payload })
                                     .then(() => setEditing(null));
  const removeUser = id      => deleteMut.mutate(id);

  if (isLoading) return <Spinner />;

  return (
    <div className="container py-5">
      <h1 className="mb-4">Users</h1>

      {localTime && (
        <div className="alert alert-info">
          Local time:&nbsp;
          <strong>{new Date(localTime.localTime).toLocaleString()}</strong>
        </div>
      )}

      {users.map(u => (
        <UserCard
          key={u.id}
          user={u}
          onEdit={() => setEditing(u)}
          onDelete={removeUser}
          onShowTime={setTimeId}
        />
      ))}

      <div className="card mt-4">
        <div className="card-header">
          {editing ? 'Edit User' : 'Add User'}
        </div>
        <div className="card-body">
          <UserForm
            initial={editing}
            onSubmit={editing ? saveUser : addUser}
            onCancel={() => setEditing(null)}
          />
        </div>
      </div>
    </div>
  );
}
