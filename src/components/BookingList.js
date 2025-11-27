import React from 'react'
import { useState, useEffect } from 'react';
import NavBar from '../pages/NavBar';



const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <h2>Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              {booking.tenant_name} - {booking.property_name} ({booking.status_name})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;






  // const BookingList = () => {
  //const Bookings = [
  //  { id: 1, tenant: 'Ajok Deng', property: 'Pyramimd Villa',status: 'Pending'},
  //  { id: 2, tenant: 'Sandra Manyarkiy', property: 'Oceanview Apartment', status: 'Approved' },
 // ];
//}
