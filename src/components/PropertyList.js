import React, { useEffect, useState } from 'react'
import NavBar from '../pages/NavBar';

function PropertyList() {

  // const [ properties, setProperties ] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/properties`)
    .then(res => res.json())
    .then(data => console.log(data))
    // .then(data => setProperties(data))

  }, [])

  // const  displayProperties = properties.map((property) => {
  //   return <PropertyItem key={property} property={property}/>
  // })

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div>
          <h1>This is the property list</h1>
          {/* {displayProperties} */}
        </div>
      </main>
    </>
  )
}

export default PropertyList
