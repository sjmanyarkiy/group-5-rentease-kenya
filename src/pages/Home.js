import React, { useState } from "react";
import NavBar from "../pages/NavBar";
import landingImage from "../img/landing7.jpg";
import "font-awesome/css/font-awesome.min.css";
import Apartment from "../components/Home/Apartment";
import { useNavigate } from "react-router-dom";

// SafeLink: use react-router's Link when available; fall back to <a> for test environments
function SafeLink({ to, children, ...rest }) {
  try {
    // require at runtime so tests that don't have react-router-dom installed don't fail at import time
    const { Link } = require('react-router-dom')
    return <Link to={to} {...rest}>{children}</Link>
  } catch (err) {
    // fallback for environments without react-router
    return <a href={to} {...rest}>{children}</a>
  }
}

function Home() {

   const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    navigate(`/properties?location=${searchTerm}`);
  }

  return (
    <>
      <header>
        <NavBar />
      </header>
<<<<<<< HEAD
      <main className="container mt-4">
        <div className="p-4 bg-light rounded"> 
          <h1 className="mb-3">Welcome to RentEase</h1>
          <p className="lead">A simple property management frontend used with a json-server backend. Use the links below to explore data and manage listings.</p>

          <div className="d-flex gap-2 mt-3">
            <SafeLink to="/properties" className="btn btn-primary">Browse Properties</SafeLink>
            <SafeLink to="/bookings" className="btn btn-outline-secondary">Bookings</SafeLink>
            <SafeLink to="/tenants" className="btn btn-outline-secondary">Tenants</SafeLink>
          </div>
        </div>
      </main>
=======
      <main>
        <div className="header" id="header">
          <div className="landing-text">
            <div className="cta">
              <p>Find Your New Modern Apartment</p>
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Search Location " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
              <button type="button" class="btn-primary" onClick={handleSearch}>Search</button>
            </div>
          </div>
          {/* <div className="landing-image">
					<img src={landingImage} alt="" />
				</div> */}
          <div className="landing-image">
            <img src={landingImage} alt="" />
          </div>
          <div className="contact-info">
            <div className="phone">
              <p>
                <i className="fa fa-phone" aria-hidden="true"></i>{" "}
                <span>(+254)7 1234 567</span>
              </p>
            </div>
            <div>
              <p>
                <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                <span>Nairobi, Kenya</span>
              </p>
            </div>
          </div>
        </div>
      </main>
	  
>>>>>>> origin/master
    </>
  );
}

export default Home;
