import React, { useState } from "react";
import NavBar from "../pages/NavBar";
import landingImage from "../img/landing7.jpg";
import "font-awesome/css/font-awesome.min.css";
import Apartment from "../components/Home/Apartment";
import { useNavigate } from "react-router-dom";

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
	  
    </>
  );
}

export default Home;
