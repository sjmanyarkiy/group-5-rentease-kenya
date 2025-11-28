import React, { useEffect, useState } from 'react'
import NavBar from '../pages/NavBar'
import { useParams } from 'react-router-dom';


function PropertyCard() {

  const { id } = useParams();

  const [ property, setProperty ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/properties/${id}`)
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

  return (
    <>
      <header>
        <NavBar />
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
              )}
            </div>
          </div>
        </div>
      </main>*/}
    </> 
  )
}

export default PropertyCard
