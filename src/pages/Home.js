import React from "react";
import NavBar from "../pages/NavBar";
import landingImage from "../img/landing.jpg";
import "font-awesome/css/font-awesome.min.css";
import Apartment from "../components/Home/Apartment";

function Home() {
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
              <input type="text" placeholder="Search Location " />
              <button>Search</button>
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
                <span>(+254)7 2496 6748</span>
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
