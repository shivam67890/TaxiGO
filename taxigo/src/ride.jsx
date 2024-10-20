import React, { useState, useRef, useEffect } from 'react';
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
  const mapComponentRef = useRef(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation([position.coords.longitude, position.coords.latitude]);
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
        return {
          type: 'LineString',
          coordinates: data.routes[0].geometry.coordinates
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

    } catch (error) {
      setError(error.message || 'Error finding route. Please try again.');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="taxi-go-container">
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