import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ride.css';
import MapComponent from './mapbox';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2hpdmFtMDg4NSIsImEiOiJjbTJodXBtdDMwYWE2Mm1xeDM2MDF1aGc3In0.GYvmqDPdmG6iAFDjl8jsRQ';

const TaxiGoRidePage = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [showRideDetails, setShowRideDetails] = useState(false);
  const mapComponentRef = useRef(null);
  const navigate = useNavigate();

  const basePrices = {
    bike: 10,
    economy: 20,
    premium: 30
  };

  const perKmRates = {
    bike: 5,
    economy: 10,
    premium: 15
  };

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = [position.coords.longitude, position.coords.latitude];
          setCurrentLocation(coords);

          // Fetch the address for the current location
          try {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=${MAPBOX_TOKEN}`
            );
            const data = await response.json();
            if (data.features && data.features.length > 0) {
              setPickupLocation(data.features[0].place_name);
            }
          } catch (error) {
            console.error('Error fetching address for current location:', error);
          }
        },
        (error) => {
          console.error('Error getting current location:', error);
          setCurrentLocation([-74.0060, 40.7128]); // Default to New York City
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setCurrentLocation([-74.0060, 40.7128]); // Default to New York City
    }
  }, []);

  // Fetch suggestions for a location
  const fetchSuggestions = async (query, setSuggestions) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?autocomplete=true&access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();

      if (data.features) {
        setSuggestions(data.features);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Convert place name to coordinates
  const getCoordinates = async (location) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        return data.features[0].center; // Returns [lng, lat]
      }
      throw new Error(`Location not found: ${location}`);
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  };

  // Get route between two sets of coordinates
  const getRoute = async (pickupCoords, dropoffCoords) => {
    try {
      const coordinates = `${pickupCoords[0]},${pickupCoords[1]};${dropoffCoords[0]},${dropoffCoords[1]}`;
      
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
      );

      if (!response.ok) {
        throw new Error('Route not found');
      }

      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        setDistance(route.distance / 1000); // Convert meters to kilometers
        return {
          type: 'LineString',
          coordinates: route.geometry.coordinates
        };
      }
      throw new Error('No route available');
    } catch (error) {
      console.error('Routing error:', error);
      throw error;
    }
  };

  const handleSearch = async () => {
    setError(null);
    setLoading(true);

    try {
      // Validate inputs
      if (!pickupLocation.trim() || !dropoffLocation.trim()) {
        throw new Error('Please enter both pickup and drop-off locations');
      }

      // Get coordinates for both locations
      const [pickupCoords, dropoffCoords] = await Promise.all([
        getCoordinates(pickupLocation),
        getCoordinates(dropoffLocation)
      ]);

      console.log('Found coordinates:', {
        pickup: pickupCoords,
        dropoff: dropoffCoords
      });

      // Get and set the route
      const routeGeometry = await getRoute(pickupCoords, dropoffCoords);
      console.log('Route geometry:', routeGeometry);
      setRoute(routeGeometry);
      setShowRideDetails(true);

    } catch (error) {
      setError(error.message || 'Error finding route. Please try again.');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setShowRideDetails(false);
    setRoute(null);
    setDistance(null);
  };

  const calculatePrice = (basePrice, perKmRate) => {
    return basePrice + (distance * perKmRate);
  };

  const handleRideOptionClick = () => {
    navigate('/payment');
  };

  return (
    <div className="taxi-go-container">
      {showRideDetails ? (
        <div className="ride-details-section">
          <button className="back-btn" onClick={handleBack}>Back</button>
          <h2>Ride Details</h2>
          <p>Distance: {distance.toFixed(2)} km</p>
          <div className="ride-options">
            <div className="ride-option" onClick={handleRideOptionClick}>
              <h3>Bike</h3>
              <p>Estimated Price: ₹{calculatePrice(basePrices.bike, perKmRates.bike).toFixed(2)}</p>
            </div>
            <div className="ride-option" onClick={handleRideOptionClick}>
              <h3>Economy Cab</h3>
              <p>Estimated Price: ₹{calculatePrice(basePrices.economy, perKmRates.economy).toFixed(2)}</p>
            </div>
            <div className="ride-option" onClick={handleRideOptionClick}>
              <h3>Premium Cab</h3>
              <p>Estimated Price: ₹{calculatePrice(basePrices.premium, perKmRates.premium).toFixed(2)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="form-section">
          <h2>Book Your Ride</h2>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>Pickup Location</label>
            <input
              type="text"
              placeholder="Enter pickup location (e.g., Times Square, New York)"
              value={pickupLocation}
              onChange={(e) => {
                setPickupLocation(e.target.value);
                fetchSuggestions(e.target.value, setPickupSuggestions);
              }}
            />
            {pickupSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {pickupSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    onClick={() => {
                      setPickupLocation(suggestion.place_name);
                      setPickupSuggestions([]);
                    }}
                  >
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-group">
            <label>Drop-off Location</label>
            <input
              type="text"
              placeholder="Enter drop-off location (e.g., Central Park, New York)"
              value={dropoffLocation}
              onChange={(e) => {
                setDropoffLocation(e.target.value);
                fetchSuggestions(e.target.value, setDropoffSuggestions);
              }}
            />
            {dropoffSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {dropoffSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    onClick={() => {
                      setDropoffLocation(suggestion.place_name);
                      setDropoffSuggestions([]);
                    }}
                  >
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className="search-btn"
            onClick={handleSearch}
            disabled={loading || !pickupLocation || !dropoffLocation}
          >
            {loading ? 'Searching...' : 'Search Route'}
          </button>
        </div>
      )}

      <div className="map-section">
        {currentLocation && (
          <MapComponent 
            ref={mapComponentRef} 
            route={route}
            initialCenter={currentLocation}
            initialZoom={11}
          />
        )}
      </div>
    </div>
  );
};

export default TaxiGoRidePage;