import React from 'react'
import NavBar from '../pages/NavBar'
import { useBookings } from '../context/BookingsContext'

function BookingsList() {
  const { bookings, loading } = useBookings()

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="container mt-4">
          <h2>Bookings</h2>
          {loading ? (
            <p>Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <div className="list-group">
              {bookings.map((b) => (
                <div key={b.id} className="list-group-item">
                  <div><strong>{b.name}</strong> ({b.email})</div>
                  <div>Property ID: {b.propertyId} • {b.startDate} → {b.endDate}</div>
                  <div>Status: {b.status}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default BookingsList
