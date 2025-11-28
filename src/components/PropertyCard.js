import React, { useEffect, useState } from 'react'
<<<<<<< HEAD
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
    const API = process.env.REACT_APP_API_URL || 'http://localhost:3000'
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

    const API = process.env.REACT_APP_API_URL || 'http://localhost:3000'

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
=======
import NavBar from '../pages/NavBar'
import { useParams } from 'react-router-dom';


function PropertyCard() {

  const { id } = useParams();

  const [ property, setProperty ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/properties/${id}`)
    .then(res => res.json())
    .then(data => {
      setProperty(data)
      setLoading(false)
    })
    .catch(error => {
      console.error('Error fetching property:', error)
      setLoading(false);
    });
  }, [id])

    if (loading) return <div>Loading...</div>;
    if (!property) return <div>Property not found</div>;
>>>>>>> origin/master

  return (
    <>
      <header>
        <NavBar />
<<<<<<< HEAD
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
=======
    </header>
    <main>
        <div>
      <h1>This is the property card</h1>
    </div>
    <div className="card mb-3">
          <div id="carouselExample" className="carousel slide">
            <img src={property.image} class="img-fluid" alt="..." />
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="card-body">
            <h5 className="card-title">{property.location}</h5>
            <p className="card-text">{property.description}</p>
            <p className="card-text">
              <strong>Rent:</strong> ${property.rent}<br/>
              <strong>Bedrooms:</strong> {property.bedrooms}<br/>
              <strong>Bathrooms:</strong> {property.bathrooms}<br/>
              <strong>Status:</strong> <span class="badge text-bg-primary">{property.status}</span>
            </p>
          </div>
        </div>
    </main>
>>>>>>> origin/master

              {submitted ? (
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
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default PropertyCard
