import React, { useEffect, useState } from "react";
import BookingList from "./BookingList";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);

  // Fetch bookings
  const fetchBookings = () => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Failed to fetch bookings:", err));
  };

  // Fetch properties
  const fetchProperties = () => {
    fetch("http://localhost:5000/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error("Failed to fetch properties:", err));
  };

  useEffect(() => {
    fetchBookings();
    fetchProperties();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {/* New Booking Request Button */}
      <div style={{ margin: "20px 0" }}>
        <Link to="/request-booking">
          <button
            style={{
              padding: "10px 15px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            New Booking Request
          </button>
        </Link>
      </div>

      {/* Booking List */}
      <BookingList
        bookings={bookings}
        properties={properties}
        refreshBookings={fetchBookings} // pass function to refresh after new booking
      />
    </div>
  );
}

export default Dashboard;
