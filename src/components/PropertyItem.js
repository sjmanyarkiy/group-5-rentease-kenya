import React from 'react'
import NavBar from '../pages/NavBar'

function PropertyItem({ property }) {

    const { id, location, image, rent, bedrooms, bathrooms, status, description } = property


  return (
    <>
    <main>
        {/* <div>
            <h1>This is the property item page</h1>
            <h1>{location}</h1>
            <img src={image} />
            <p>{rent}</p>
        </div> */}       
  
            <div className="card" style={{width: "18rem"}}>
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{location}</h5>
                <p className="card-text">{description}</p>
                <a href="#" className="btn btn-primary">View property</a>
            </div>
        </div>

    </main>
    
    </>
  )
}

export default PropertyItem
