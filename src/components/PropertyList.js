import React, { useEffect, useState } from "react";
import NavBar from "../pages/NavBar";
import PropertyItem from "./PropertyItem";
import AddPropertyForm from "./AddPropertyForm";
import { Oval } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

function PropertyList() {
  const [properties, setProperties] = useState([]);
  // Default to localhost:3000 if REACT_APP_API_URL is not set
  const API = process.env.REACT_APP_API_URL || 'http://localhost:3000'
  // derive location filter from URL query param `location`, e.g. /properties?location=nairobi
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const locationFilter = (params.get('location') || '').toLowerCase()

  useEffect(() => {
    fetch(`${API}/properties`)
      .then((res) => res.json())
      .then((data) => setProperties(data))
      // .then(data => console.log(data))
      .catch((error) => console.error(error));
  }, [API]);

  function handleAddProperty(newProperty) {
    // keep local state in sync after successful POST from AddPropertyForm
    setProperties((prev) => [...prev, newProperty])
  }

  const filteredProperties = properties.filter((property) =>
    (property.location || '').toLowerCase().includes(locationFilter)
  );

  const displayProperties = filteredProperties.map((property) => (
    <PropertyItem key={property.id} property={property} />
  ));



  return (
    <>
      <header>
        <NavBar />
      </header>
      {/* Loader */}
      {}
      <main>
        <div className="d-flex justify-content-between align-items-center">
          <h1>This is the property list</h1>
        </div>
        <div className="mt-3">
          <AddPropertyForm onAdd={handleAddProperty} />
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
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="oval-loading"
            />
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {displayProperties}
          </div>
        )}
      </main>
    </>
  );
}

export default PropertyList;
