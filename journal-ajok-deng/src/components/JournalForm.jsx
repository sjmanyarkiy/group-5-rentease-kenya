import React, { useState } from 'react';

const JournalForm = ({ addJournal }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError('Both title and body are required.');
      return;
    }
    addJournal({ title, body });
    setTitle('');
    setBody('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="journal-form">
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <button type="submit">Add Journal</button>
    </form>
  );
};

export default JournalForm;
