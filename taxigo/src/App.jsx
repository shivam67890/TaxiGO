import React, { useState, useEffect } from 'react';
import './style.css'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaxiGoRidePage from './ride.jsx';
import Nav from './nav.jsx';
import MainContent from './maincontent.jsx';
import MapComponent from './mapbox.jsx';
import PaymentPage from './paymentpage.jsx';  // Import the PaymentPage
import BusinessPage from './buisseness.jsx'; // Import the BusinessPage
import Drivepage from './drive.jsx'; 
import Loading from './loading.jsx';
import Login from './login.jsx';

const App = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
    }, 2200); // Adjust the duration as needed

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <Router>
      <div className="app-container">
        {loading ? (
          <Loading /> // Show loading component while loading
        ) : (
          <>
            <Nav /> {/* Only one navigation component */}
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/ride" element={<TaxiGoRidePage />} />
              <Route path="/map" element={<MapComponent />} />
              <Route path="/payment" element={<PaymentPage />} /> {/* New route for payment */}
              <Route path="login" element={<Login />} /> {/* New route for login */}
              <Route path="/business" element={<BusinessPage />} /> {/* New route for business */}
              <Route path="/drive" element={<Drivepage />} /> 
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
