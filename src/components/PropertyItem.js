import React from 'react'
import NavBar from '../pages/NavBar'
import { Link } from 'react-router-dom'

function PropertyItem({ property }) {

    const { id, location, image, rent, bedrooms, bathrooms, status, description } = property


  return (
    <>
    <main>
            <div className="col">
                <div className="card" style={{width: "18rem"}}>
                <img src={image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{location}</h5>
                    <p className="card-text">{description}</p>
                    {/* Navigate to the property details route */}
                    <Link to={`/properties/${id}`} className="btn btn-primary">View property</Link>
                </div>
                </div>
            </div>


    </main>
    
    </>
  )
}

export default PropertyItem
