import React from 'react'
import { useEffect } from 'react';
import {useNavigate, Link } from 'react-router-dom'; 
import NavBar  from '../NavBar.jsx'
import { Box } from '@mui/material';
import Fetch from './components/Fetch.jsx';
export default function MaMeteo() {
  return (
   <Box>
<NavBar></NavBar>
<Fetch></Fetch>
   </Box>    
  )
}
