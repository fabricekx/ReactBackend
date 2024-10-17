import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../NavBar.jsx";
import { Box } from "@mui/material";
import FetchMeteo from "./components/FetchMeteo.jsx";
import MapPicker from "./components/MapPicker.jsx";

export default function MaMeteo() {

    const [coordinates, setCoordinates] = useState({ lat: 43.5310, lng: 7.035 }); // coordonnées par défaut

    const handleMapClick = (lat, lon) => {
      setCoordinates({  lat, lng: lon });
    };
  
  return (
    <Box>
      <NavBar/>
      <MapPicker onMapClick={handleMapClick} />
      {coordinates.lat && coordinates.lng && (
        <FetchMeteo latitude={coordinates.lat} longitude={coordinates.lng} />
      )}
      
    </Box>
  );
}
