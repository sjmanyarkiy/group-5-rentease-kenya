import React, { createContext, useContext, useEffect, useState } from 'react'

const BookingsContext = createContext()

export function BookingsProvider({ children }) {
  // Default to localhost:3000 if REACT_APP_API_URL is not provided
  const API = process.env.REACT_APP_API_URL || 'http://localhost:3000'
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // load existing bookings from the json-server
    setLoading(true)
    fetch(`${API}/bookings`)
      .then((r) => r.json())
      .then((data) => setBookings(data || []))
      .catch((e) => console.error('Failed to load bookings', e))
      .finally(() => setLoading(false))
  }, [API])

  function addBooking(newBooking) {
    // update local state with the POST response object
    setBookings((prev) => [...prev, newBooking])
  }

  const value = { bookings, loading, addBooking }

  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>
}

export function useBookings() {
  const ctx = useContext(BookingsContext)
  if (!ctx) throw new Error('useBookings must be used within a BookingsProvider')
  return ctx
}

export default BookingsContext
