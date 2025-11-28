import './App.css';
import { Routes, Route } from "react-router-dom";
import BookingList from './components/BookingList';
import PropertyDetail from './pages/PropertyDetail';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route path="/" element={<BookingList />} />

        
        <Route path="/home" element={<Home />} />

        
        <Route path="/properties/:id" element={<PropertyDetail />} />
      </Routes>
    </div>
  );
}

export default App;
