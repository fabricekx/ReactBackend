import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Composant pour gérer les clics sur la carte
function ClickableMap({ setCoordinates }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setCoordinates({ lat, lng }); // Envoie les coordonnées choisies
    },
  });
  return null;
}

export default function MapPicker() {
  const [coordinates, setCoordinates] = useState({ lat: 43.5513, lng: 7.0127 }); // Coordonnées par défaut

  return (
    <div>
      <h2>Choisissez un emplacement</h2>
      <MapContainer
        center={[coordinates.lat, coordinates.lng]} // Centre de la carte
        zoom={13}
        style={{ height: '400px', width: '100%' }} // Taille de la carte
        dragging={true} // permet de dragger (glisser)
      >
        {/* Affichage des tuiles OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {/* Marqueur aux coordonnées choisies */}
        <Marker position={[coordinates.lat, coordinates.lng]} />
        {/* Composant pour gérer les clics sur la carte */}
        <ClickableMap setCoordinates={setCoordinates} />
      </MapContainer>

      <div style={{ marginTop: '20px' }}>
        <h3>Coordonnées choisies :</h3>
        <p>Latitude: {coordinates.lat}</p>
        <p>Longitude: {coordinates.lng}</p>
      </div>
    </div>
  );
}
