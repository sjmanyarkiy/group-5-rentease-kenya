import React, { useEffect, useState } from "react";
import NavBar from "../pages/NavBar";
import PropertyItem from "./PropertyItem";
import AddPropertyForm from "./AddPropertyForm";
import { Oval } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState("");
  // Default to localhost:3000 if REACT_APP_API_URL is not set
 const API = process.env.REACT_APP_API_URL || 'https://rentease-json-server.onrender.com'
 // derive location filter from URL query param `location`, e.g. /properties?location=nairobi
 const { search } = useLocation()
 const params = new URLSearchParams(search) 
//  console.log("API URL:", API)


  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  const locationFilter = (params.get('location') || '').toLowerCase()


  useEffect(() => {
    fetch(`${API}/properties`)
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error(error));
  }, [API]);



  const filteredProperties = properties.filter((property) =>{ 
    const matchesLocation = property.location.toLowerCase().includes(locationFilter);
    const matchesSearch = searchTerm === "" ||
    property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesLocation && matchesSearch;
    });

  const displayProperties = filteredProperties.map((property) => (
    <PropertyItem key={property.id} property={property} />
  ));


  function handleAddProperty(newProperty) {
   // keep local state in sync after successful POST from AddPropertyForm
   setProperties((prev) => [...prev, newProperty])
 }



  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="container my-4"><h2 className="justify-content-center text-3xl font-bold mb-8 text-gray-800">Explore Latest Properties</h2></div>
      <main>
        {/* Search */}
       <div className="container my-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Search properties by title, location, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    borderRadius: "50px 0 0 50px",
                    padding: "12px 20px"
                  }}
                />
                {searchTerm && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setSearchTerm("")}
                    style={{ borderRadius: "0 50px 50px 0" }}
                  >
                    Clear
                  </button>
                )}
                {!searchTerm && (
                  <span 
                    className="input-group-text"
                    style={{ borderRadius: "0 50px 50px 0" }}
                  >
                    <i className="bi bi-search"></i>
                  </span>
                )}
              </div>
              
              {/* Results count */}
              {searchTerm && (
                <p className="text-muted text-center mb-3">
                  Found {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Adding Form */}
       <div className="mt-3 container my-4">
         <AddPropertyForm onAdd={handleAddProperty} />
       </div>

        
        {/* Spinner */}
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
              color="blue"
              secondaryColor="blue"
              ariaLabel="oval-loading"
            />
          </div>
        ) : (
          <div className="container">
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {displayProperties.length > 0 ? (
                displayProperties
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-muted">No properties found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default PropertyList;
