// maincontent.jsx
import React from 'react';

const MainContent = () => {
  return (
    <>
      <div className="container">
        <div className="left-section">
          <h1>Go anywhere with TaxiGO</h1>
          <p>Request a ride, hop in, and go.</p>
          <input type="text" placeholder="Enter location" />
          <input type="text" placeholder="Enter destination" />
          <button className="price-button">See prices</button>
        </div>
        <div className="right-section">
          {/* Image placeholder */}
        </div>
      </div>

      <div className="drive-section">
        <div className="drive-image">
          {/* Image placeholder */}
        </div>
        <div className="drive-content">
          <h2>Drive when you want, make what you need</h2>
          <p>
            Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through TaxiGO.
          </p>
          <div className="cta-buttons">
            <button className="get-started">Get started</button>
            <a href="#" className="sign-in-link">Already have an account? Sign in</a>
          </div>
        </div>
      </div>

      <a href="#" className="back-to-top">↑</a>
    </>
  );
};

export default MainContent;