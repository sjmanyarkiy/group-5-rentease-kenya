import React from 'react';
import BookingList from './components/BookingList';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <BookingList />

<Link to="/request-booking">
  <button style={{ padding: "10px", background: "#007bff", color: "white" }}>
    New Booking Request
  </button>
</Link>



    </div>
  );
};

export default Dashboard;

