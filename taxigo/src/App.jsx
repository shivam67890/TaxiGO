import React from 'react';
import './style.css'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaxiGoRidePage from './ride.jsx';
import Nav from './nav.jsx';
import MainContent from './maincontent.jsx';
import MapComponent from './mapbox.jsx';  // Import the MapComponent

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Nav /> {/* Only one navigation component */}
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/ride" element={<TaxiGoRidePage />} />
          <Route path="/map" element={<MapComponent />} /> {/* New route for map */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
