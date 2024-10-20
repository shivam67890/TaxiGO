import React, { useRef, useEffect, forwardRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Apply this style to your CSS or in a style tag
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

  useEffect(() => {
    try {
      // Set token directly
      mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpdmFtMDg4NSIsImEiOiJjbTJodXBtdDMwYWE2Mm1xeDM2MDF1aGc3In0.GYvmqDPdmG6iAFDjl8jsRQ';

      if (!mapContainerRef.current) {
        console.error('Map container ref is not available');
        return;
      }

      console.log('Initializing map...');

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: initialCenter,
        zoom: initialZoom,
        preserveDrawingBuffer: true
      });

      // Add load handler
      map.on('load', () => {
        console.log('Map loaded successfully');
      });

      // Handle map load errors
      map.on('error', (e) => {
        console.error('Mapbox error:', e);
      });

      // Store map instance
      mapRef.current = map;

      // Handle ref
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
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [initialCenter, initialZoom, ref]);

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

      map.on('style.load', () => {
        console.log('Style loaded, adding route...');
        addRouteToMap();
      });

      function addRouteToMap() {
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
      }
    } catch (error) {
      console.error('Error updating route:', error);
    }
  }, [route]);

  return (
    <div 
      ref={mapContainerRef}
      style={mapStyles}
      aria-label="Map"
      role="application"
    />
  );
});

MapComponent.displayName = 'MapComponent';

export default MapComponent;