import { Box, Stack } from '@mui/material';
import React from 'react';
import axios from 'axios';
import CardPubli from './cardPubli';
import { useState, useEffect } from 'react';
import {useQueryClient, useQuery} from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast';


export default function ListePublis() {
    
    const queryClient = useQueryClient();
    const {data: publications, error, isLoading} = useQuery({
        queryKey: ["publications"], // doit être dans un array
        queryFn: () => axios.get("http://localhost:3000/publications").then((res) => res.data),
        throwOnError: (error) => console.log (error)
    }   
    );

    const [publis, setPublis] = useState([]);
    //////////////////// useEffect est remplacé par Readt Query
    // console.log(publis);
    // useEffect(() => { // l'utilisation de useEffect empeche le fait d'avoir une boucle infinie
    //     axios.get("http://localhost:3000/publications")
    //       .then((res) => setPublis(res.data))
    //       .catch((error) => console.error("Erreur lors de la récupération des publications :", error));
    //   }, []); // Le tableau vide [] signifie que l'effet s'exécute seulement une fois lors du montage.
      
    if (isLoading){ return <div>Chargement....</div>}

    // on trie les publications par ordre inverse de date
    if(publications) {
    let publiTriees = publications.sort((a,b) => { return new Date(b.date) - new Date(a.date)})
};
    return (
    <Stack width={"60%"} margin={"auto"}>
        <h2>Liste des publications</h2>
{publications.map((publiTriees) => <Box margin={5}><CardPubli donnees={publiTriees}  key={publiTriees.id}></CardPubli></Box> )}
   </Stack>
  )
}
