import React, { useState } from 'react';
import './ride.css';

const TaxiGoRidePage = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [time, setTime] = useState('now');
  const [rideFor, setRideFor] = useState('me');

  const handleSearch = () => {
    // Add your search logic here
    console.log('Searching for rides:', { pickupLocation, dropoffLocation, time, rideFor });
  };

  return (
    <div className="taxi-go-container">
      <div className="form-section">
        <br />
        <br />

        <h2>Go anywhere with TaxiGO</h2>
        <div className="form-group">
          <label>Enter Location</label>
          <input 
            type="text" 
            placeholder="Pickup location"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Enter Destination</label>
          <input 
            type="text" 
            placeholder="Dropoff location"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Pickup Time</label>
          <select 
            value={time} 
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="now">Pickup now</option>
            <option value="later">Schedule for later</option>
          </select>
        </div>
        <div className="form-group">
          <label>Ride For</label>
          <select 
            value={rideFor}
            onChange={(e) => setRideFor(e.target.value)}
          >
            <option value="me">For me</option>
            <option value="someoneElse">For someone else</option>
          </select>
        </div>
        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>
      <div className="map-section">
        {/* Embed Google Maps or another map component here */}
        <div className="map-placeholder">Map goes here</div>
      </div>
    </div>
  );
};

export default TaxiGoRidePage;