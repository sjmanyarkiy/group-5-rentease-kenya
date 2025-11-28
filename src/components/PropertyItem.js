import React from 'react'
import { Link } from 'react-router-dom'

function PropertyItem({ property }) {

    const { id, location, image, rent, bedrooms, bathrooms, status, description } = property
    console.log(id)


  return (
    <>
    <main>
      <div className="col">
        <div className="card" style={{ width: "18rem" }}>
          <img src={image} className="card-img-top" alt={location} />
          <div className="card-body">
            <h5 className="card-title">{location}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><strong>Rent:</strong> KES {rent}</p>
            <p className="card-text">{bedrooms} bed • {bathrooms} bath • <em>{status}</em></p>
            <Link to={`/properties/${id}`} className="btn btn-primary">View property</Link>
          </div>
        </div>
      </div>

    </main>
    
    </>
  )
}

export default PropertyItem
