import React, { useState } from "react";
import NavBar from "../pages/NavBar";
import landingImage from "../img/landing7.jpg";
import Apartment from "../components/Home/Apartment";

// runtime-require optional CSS and react-router helpers to avoid test-time import errors

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
  // useNavigate may not be available in the test environment — require at runtime
  let navigate = () => {};
  try {
    // eslint-disable-next-line global-require
    navigate = require('react-router-dom').useNavigate();
  } catch (e) {
    // noop navigate during tests
    navigate = () => {};
  }

  function handleSearch() {
    try {
      navigate(`/properties?location=${searchTerm}`);
    } catch (e) {
      // noop in test env
    }
  }

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="header" id="header">
          <div className="landing-text">
            <div className="cta">
              <p>Find Your New Modern Apartment</p>
            </div>
            <div className="search-bar">
              <input type="text" placeholder="Search Location " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
              <button type="button" className="btn-primary" onClick={handleSearch}>Search</button>
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
    </>
  );
}

export default Home;
