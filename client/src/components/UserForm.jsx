import { useState, useEffect } from 'react';

export default function UserForm({ initial = null, onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [zip,  setZip]  = useState('');

  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setZip(initial.zipCode);
    }
  }, [initial]);

  const reset = () => { setName(''); setZip(''); };

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name, zip }).then(reset);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">ZIP Code</label>
        <input
          className="form-control"
          value={zip}
          onChange={e => setZip(e.target.value)}
          required
          pattern="\d{5}"
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {initial ? 'Update' : 'Add'}
        </button>
        {initial && (
          <button type="button" onClick={() => { reset(); onCancel(); }}
                  className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
