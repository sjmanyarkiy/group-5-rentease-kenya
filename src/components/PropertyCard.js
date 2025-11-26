import React, { useEffect, useState } from 'react'
import NavBar from '../pages/NavBar'
import { useParams } from 'react-router-dom';

function PropertyCard() {

  const { id } = useParams();

  const [ property, setProperty ] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/properties/${id}`)
    .then(res => res.json())
    .then((data) => setProperty(data))
  })

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
      <img src={property.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
    </main>

    
    </>
  )
}

export default PropertyCard
