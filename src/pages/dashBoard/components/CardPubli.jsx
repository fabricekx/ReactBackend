import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { Box, Stack, Button, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";


export default function CardPubli(donnees) {

    const useQuery = useQueryClient();
    const mutation = useMutation({
        mutationFn: (id) =>  axios.delete(`http://localhost:3000/publications/${id}`),
        onError: () => toast.error("Une erreur est survenue..."),
        onSuccess: () => {
            toast.success("La publication a été supprimée"); 
      useQuery.invalidateQueries("publications") // permet d'invalider la requete et donc de refaire une requête
          },
    });

    
const supprimerPubli = (id) => { console.log(id); mutation.mutate(id)};
  return (
    <Card sx={{ Width: 100 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="auto"
          width="auto"
          image={donnees.donnees.image}
          alt="green iguana"
        />
        <CardContent >
         
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {donnees.donnees.publication} 
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <Button onClick={() => supprimerPubli(donnees.donnees.id)} variant="contained" endIcon={<DeleteIcon />}>
    Supprimer
  </Button>
    </Card>
    
  );
}