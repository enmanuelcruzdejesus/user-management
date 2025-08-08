import { useState } from 'react';
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useLocalTime,
} from '../hooks/useUsers';

import Spinner    from '../components/Spinner';
import UserCard   from '../components/UserCard';
import UserForm   from '../components/UserForm';
import Paginator  from '../components/Paginator';   

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const limit = 5;                         

  const { data, isLoading } = useUsers(page, limit);
  const users = data?.users ?? [];


  const createMut = useCreateUser();
  const updateMut = useUpdateUser();
  const deleteMut = useDeleteUser();

  const [editing, setEditing]   = useState(null);
  const [timeUserId, setTimeId] = useState(null);
  const { data: localTime }     = useLocalTime(timeUserId, { enabled: !!timeUserId });

  /* ------------------------------------------------------------------
     Handlers
  ------------------------------------------------------------------ */
  const addUser    = payload => createMut.mutateAsync(payload);
  const saveUser   = payload =>
    updateMut.mutateAsync({ id: editing.id, patch: payload }).then(() => setEditing(null));
  const removeUser = id => deleteMut.mutate(id);

  /* ------------------------------------------------------------------ */
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

      {/* ---------------- User list ---------------- */}
      {users.map(u => (
        <UserCard
          key={u.id}
          user={u}
          onEdit={() => setEditing(u)}
          onDelete={removeUser}
          onShowTime={setTimeId}
        />
      ))}

      <Paginator
        page={page}
        pages={data?.pages || 1}
        onPage={setPage}
      />

      {/* ---------------- Form ---------------- */}
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
