// maincontent.jsx
import React from 'react';
import './style.css';



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
          <div className='overlayimg'>
          <img src="src/assets/carnobg.png" alt="" className='changcss'/>
          </div>
        </div>
        <div className="right-section">
        </div>
        
      </div>

      <div className="bgwhite">
        <section className="suggestions">
          <h2>Suggestions</h2>
          <div className="card-container">
            <div className="suggestion-card">
              <div className="card-content">
                <h3>Ride</h3>
                <p>Go anywhere with TaxiGO fast, easy, and affordable.</p>
              </div>
              <img src="src/assets/2homecar.jpg" alt="Car icon" style={{ width: '100px', height: 'auto' }} />
            </div>
            <div className="suggestion-card">
              <div className="card-content">
                <h3>Reserve</h3>
                <p>Reserve your ride in advance so that you can enjoy your trip.</p>
              </div>
              <img src="src/assets/3homecal.jpg" alt="Calendar icon" style={{ width: '100px' }} />
            </div>
          </div>
        </section>

        <section className="driver-section">
          <div className="section-image">
            <img src="src/assets/4homecar.jpg" alt="Driver dashboard view" />
          </div>
          <div className="section-content">
            <h1>Drive when you want, make what you need</h1>
            <p>
              Make money on your schedule with deliveries or rides—or both. You can use your own car or
              choose a rental through TaxiGO.
            </p>
            <a href="#" className="get-started">get started</a>
          </div>
        </section>

        <section className="business-section">
          <div className="section-content">
            <h2>The TaxiGO you know, reimagined for business</h2>
            <p>
              TaxiGO for Business is a platform for managing global rides and meals, and local deliveries, for
              companies of any size.
            </p>
            <a href="#" className="get-started">get started</a>
          </div>
          <div className="section-image">
            <img src="src/assets/5homecar.jpg" alt="Business illustration" />
            
          </div>
        </section>
        
      </div>
      </>
  );
};

export default MainContent;