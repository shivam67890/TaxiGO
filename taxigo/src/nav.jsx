// nav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './assets/logo.png';

const Nav = () => {
  const location = useLocation();
  const isRidePage = location.pathname === '/ride';

  return (
    <nav className={isRidePage ? 'nav-ride' : 'nav-default'} role="navigation">
      <div className="logo">
        <img src={logo} alt="TaxiGO" className="logo-img" />
      </div>
      <ul>
        {isRidePage ? (
          <>
            <li><Link to="/ride">Ride</Link></li>
            <li id='package'><Link to="/package">Package</Link></li>
            <li><Link to="/rental">Rental</Link></li>
          </>
        ) : (   
          <>
            <li><Link to="/ride">Ride</Link></li>
            <li><Link to="/drive">Drive</Link></li>
            <li><Link to="/business">Business</Link></li>
            <li><Link to="/about">About</Link></li>
          </>
        )}
      </ul>
      {/* Remove nav-actions for ride page */}
      {!isRidePage && (
        <div className="nav-actions">
          <span className="language">EN</span>
          <span className="help">Help</span>
          <div className="auth-buttons">
            <span className="login">Log in</span>
            <button className="sign-up">Sign up</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;