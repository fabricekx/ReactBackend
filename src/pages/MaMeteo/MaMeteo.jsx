import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../NavBar.jsx";
import { Box } from "@mui/material";
import FetchMeteo from "./components/FetchMeteo.jsx";
import ClickableMap from "./components/MapPicker.jsx";

export default function MaMeteo() {
  return (
    <Box>
      <NavBar/>
      <ClickableMap/>
      <FetchMeteo/>
    </Box>
  );
}
