import React from 'react';

const JournalItem = ({ journal, toggleImportant, deleteJournal }) => {
  return (
    <div className={`journal-item ${journal.important ? 'important' : ''}`}>
      <h3 className="journal-title">{journal.title}</h3>
      <p className="journal-body">{journal.body}</p>

      <div className="journal-actions">
        <button onClick={() => toggleImportant(journal.id)}>
          {journal.important ? 'Unmark Important' : 'Mark Important'}
        </button>
        <button onClick={() => deleteJournal(journal.id)}>Delete</button>
      </div>
    </div>
  );
};

export default JournalItem;
