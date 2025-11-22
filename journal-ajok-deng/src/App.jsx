
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JournalList from './components/JournalList';
import JournalForm from './components/JournalForm';
import "./App.css";


const App = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setJournals(res.data.slice(0, 10)); // Limit to 10 for simplicity
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addJournal = async (journal) => {
    setLoading(true);
    try {
      const res = await axios.post('https://jsonplaceholder.typicode.com/posts', journal);
      setJournals([res.data, ...journals]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleImportant = (id) => {
    setJournals(journals.map(j => j.id === id ? { ...j, important: !j.important } : j));
  };

  const deleteJournal = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setJournals(journals.filter(j => j.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app">
      <h1>Journal App</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'New Journal Entry'}
      </button>
      {showForm && <JournalForm addJournal={addJournal} />}
      {loading ? <p>Loading...</p> :
        <JournalList journals={journals} toggleImportant={toggleImportant} deleteJournal={deleteJournal} />}
    </div>
  );
};

export default App;
