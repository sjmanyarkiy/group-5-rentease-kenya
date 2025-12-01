import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../pages/NavBar'
import { useBookings } from '../context/BookingsContext'

function PropertyCard() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // booking form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { addBooking } = useBookings()

  useEffect(() => {
    if (!id) return
    setLoading(true)
    // Default API to localhost:3000 unless overridden by REACT_APP_API_URL
    const API = process.env.REACT_APP_API_URL || 'http://localhost:5000'
    fetch(`${API}/properties/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch property')
        return res.json()
      })
      .then((data) => setProperty(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Basic validation
    if (!name || !email || !startDate || !endDate) {
      alert('Please fill in name, email, start and end dates')
      return
    }

    const booking = {
      propertyId: Number(id),
      name,
      email,
      startDate,
      endDate,
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    const API = process.env.REACT_APP_API_URL || 'http://localhost:5000'

    fetch(`${API}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Booking failed')
        return res.json()
      })
      .then((data) => {
        // update global bookings state so UI can re-render
        try {
          addBooking(data)
        } catch (err) {
          // fall back: still set submitted if provider not available
          console.warn('addBooking not available', err)
        }

        setSubmitted(true)
        // clear form
        setName('')
        setEmail('')
        setStartDate('')
        setEndDate('')
        setMessage('')
      })
      .catch((err) => alert(err.message))
  }

  if (loading) return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="container mt-5">Loading property...</div>
      </main>
    </>
  )

  if (error) return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="container mt-5">Error: {error}</div>
      </main>
    </>
  )

  if (!property) return null

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <img src={property.image} alt={property.location} className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h2>{property.location}</h2>
              <p>{property.description}</p>
              <p><strong>Rent:</strong> KES {property.rent}</p>
              <p><strong>Bedrooms:</strong> {property.bedrooms} • <strong>Bathrooms:</strong> {property.bathrooms}</p>
              <p><strong>Status:</strong> {property.status}</p>

              {/* {submitted ? (
                <div className="alert alert-success">Booking submitted successfully. The landlord will review and respond.</div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4">
                  <h5>Request to book</h5>
                  <div className="mb-2">
                    <label className="form-label">Full name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                  </div>
                  <div className="row">
                    <div className="col">
                      <label className="form-label">Start date</label>
                      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="form-control" />
                    </div>
                    <div className="col">
                      <label className="form-label">End date</label>
                      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control" />
                    </div>
                  </div>
                  <div className="mb-2 mt-2">
                    <label className="form-label">Message (optional)</label>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" rows={3} />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit booking request</button>
                </form>
              )}*/}
            </div>
          </div>
        </div>
      </main>
    </> 
  )
}

export default PropertyCard
