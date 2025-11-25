import React, { useEffect, useState } from 'react'
import NavBar from '../pages/NavBar';
import PropertyItem from './PropertyItem';
import { Oval } from 'react-loader-spinner'
import { OrbitProgress } from 'react-loading-indicators'


function PropertyList() {
  

  const [ properties, setProperties ] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/properties`)
    .then(res => res.json())
    .then(data => setProperties(data))
    // .then(data => console.log(data))
    .catch(error => console.error(error))

  }, [])

  const  displayProperties = properties.map(property => {
     return <PropertyItem key={property.id} property={property}/>
  })
  
    
  return (
    <>
      <header>
        <NavBar />
      </header>
      {/* Loader */}
      {}
      <main>
        <div>
          <h1>This is the property list</h1>
        </div>
        {properties.length === 0 ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {displayProperties}
        </div>
      )}
            
      </main>
    </>
  )
}

export default PropertyList
