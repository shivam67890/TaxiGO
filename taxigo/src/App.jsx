import React from 'react';
import './style.css'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaxiGoRidePage from './ride.jsx';
import Nav from './nav.jsx';
import MainContent from './maincontent.jsx';
import MapComponent from './mapbox.jsx';
import PaymentPage from './payment.jsx';  // Import the PaymentPage

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Nav /> {/* Only one navigation component */}
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/ride" element={<TaxiGoRidePage />} />
          <Route path="/map" element={<MapComponent />} />
          <Route path="/payment" element={<PaymentPage />} /> {/* New route for payment */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;