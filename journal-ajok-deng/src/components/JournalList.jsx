import React from 'react';
import JournalItem from './JournalItem';

const JournalList = ({ journals, toggleImportant, deleteJournal }) => {
  return (
    <div className="journal-list">
      {journals.map(journal => (
        <JournalItem
          key={journal.id}
          journal={journal}
          toggleImportant={toggleImportant}
          deleteJournal={deleteJournal}
        />
      ))}
    </div>
  );
};

export default JournalList;
