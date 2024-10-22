import React from 'react';
import './style.css'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaxiGoRidePage from './ride.jsx';
import Nav from './nav.jsx';
import MainContent from './maincontent.jsx';
import MapComponent from './mapbox.jsx';
import PaymentPage from './paymentpage.jsx';  // Import the PaymentPage
import BusinessPage from './buisseness.jsx'; // Import the BusinessPage
import Drivepage from './drive.jsx'; 

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
          <Route path="/business" element={<BusinessPage />} /> {/* New route for business */}
          <Route path="/drive" element={<Drivepage />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;