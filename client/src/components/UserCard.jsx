export default function UserCard({ user, onEdit, onDelete, onShowTime }) {
  return (
    <div className="card mb-2">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-0">{user.name}</h5>
          <small className="text-muted">{user.zipCode}</small>
        </div>

        <div className="btn-group btn-group-sm">
          <button
            className="btn btn-outline-primary"
            title="Local time"
            onClick={() => onShowTime(user.id)}
          >
            <i className="bi bi-clock"></i>
          </button>

          <button
            className="btn btn-outline-warning"
            title="Edit"
            onClick={() => onEdit(user)}
          >
            <i className="bi bi-pencil"></i>
          </button>

          <button
            className="btn btn-outline-danger"
            title="Delete"
            onClick={() => onDelete(user.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
