import React, { useRef, useEffect, useState, forwardRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const mapStyles = {
  width: '100%',
  height: '500px',
  position: 'relative'
};

const DEFAULT_CENTER = [-74.0060, 40.7128]; // New York City
const DEFAULT_ZOOM = 12;

const MapComponent = forwardRef(({
  route,
  initialCenter = DEFAULT_CENTER,
  initialZoom = DEFAULT_ZOOM,
}, ref) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [cityName, setCityName] = useState('');
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpdmFtMDg4NSIsImEiOiJjbTJodXBtdDMwYWE2Mm1xeDM2MDF1aGc3In0.GYvmqDPdmG6iAFDjl8jsRQ';

    if (!mapContainerRef.current) {
      console.error('Map container ref is not available');
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: initialCenter,
      zoom: initialZoom,
      preserveDrawingBuffer: true
    });

    const marker = new mapboxgl.Marker()
      .setLngLat(initialCenter)
      .addTo(map);
    setCurrentLocationMarker(marker);

    map.on('load', () => {
      console.log('Map loaded successfully');
      fetchCityName(map.getCenter());
    });

    map.on('moveend', () => {
      fetchCityName(map.getCenter());
    });

    map.on('error', (e) => {
      console.error('Mapbox error:', e);
    });

    mapRef.current = map;

    if (ref) {
      if (typeof ref === 'function') {
        ref(map);
      } else {
        ref.current = map;
      }
    }

    return () => {
      if (map) {
        console.log('Removing map...');
        map.remove();
      }
    };
  }, [initialCenter, initialZoom, ref]);

  const fetchCityName = async (center) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${center.lng},${center.lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const cityFeature = data.features.find(feature => feature.place_type.includes('place'));
        if (cityFeature) {
          setCityName(cityFeature.text);
        }
      }
    } catch (error) {
      console.error('Error fetching city name:', error);
    }
  };

  useEffect(() => {
    const map = mapRef.current;
    
    if (!map || !route?.coordinates) return;

    try {
      const routeGeoJSON = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route.coordinates
          }
        }]
      };

      if (map.getSource('route')) {
        map.getSource('route').setData(routeGeoJSON);
      } else {
        map.addSource('route', {
          type: 'geojson',
          data: routeGeoJSON,
        });

        map.addLayer({
          id: 'routeline-active',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
          },
        });
      }

      if (route.coordinates.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        route.coordinates.forEach(coord => bounds.extend(coord));
        map.fitBounds(bounds, { padding: 50 });
      }
    } catch (error) {
      console.error('Error updating route:', error);
    }
  }, [route]);

  useEffect(() => {
    if (currentLocationMarker) {
      currentLocationMarker.setLngLat(initialCenter);
    }
  }, [initialCenter, currentLocationMarker]);

  return (
    <div>
      <div 
        ref={mapContainerRef}
        style={mapStyles}
        aria-label="Map"
        role="application"
      />
      {cityName && <div className="city-name">City: {cityName}</div>}
    </div>
  );
});

MapComponent.displayName = 'MapComponent';

export default MapComponent;