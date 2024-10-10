import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../NavBar.jsx";
import { Box } from "@mui/material";
import AjouterPublic from "./components/AjouterPublic.jsx";
import ListePublis from "./components/ListePublis.jsx";

export default function DashBoard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("utilisateur")) {
      navigate("/connexion");
    } // si pas d' utilisateur, on va directement à connexion
  });
  return (
    <Box>
      <NavBar />
      <AjouterPublic></AjouterPublic>
      <ListePublis></ListePublis>
    </Box>
  );
}
