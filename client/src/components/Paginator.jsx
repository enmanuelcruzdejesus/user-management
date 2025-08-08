export default function Paginator({ page, pages, onPage }) {
  if (pages < 1) return null;

  const items = [];
  for (let p = 1; p <= pages; p++) {
    items.push(
      <li key={p} className="page-item">
        <button
          className={`page-link ${p === page ? 'active' : ''}`}
          onClick={() => onPage(p)}
          disabled={p === page}
        >
          {p}
        </button>
      </li>
    );
  }

  return (
    <nav>
      <ul className="pagination justify-content-center mt-3">
        {items}
      </ul>
    </nav>
  );
}
