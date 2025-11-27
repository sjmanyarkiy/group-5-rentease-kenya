import React, { useEffect, useState } from "react";
import NavBar from "../pages/NavBar";
import PropertyItem from "./PropertyItem";
import { Oval } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

function PropertyList() {
  const [properties, setProperties] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const locationFilter = queryParams.get("location")?.toLowerCase() || "";

  useEffect(() => {
    fetch(`http://localhost:3000/properties`)
      .then((res) => res.json())
      .then((data) => setProperties(data))
      // .then(data => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredProperties = properties.filter((property) =>
  property.location.toLowerCase().includes(locationFilter)
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
