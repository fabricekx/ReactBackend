import { Stack, TextField, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";


export default function AjouterPublic() {
  const user=JSON.parse(localStorage.getItem("utilisateur"))
    const {
    register,
    handleSubmit,
    formState: { errors },
    reset // permet de supprimer le register après le submit
  } = useForm(); // handleSubmit va vérifier les donnée, on va l'appeler sur les champs
  const queryClient = useQueryClient(); 
  const onSubmit = (data) => {
    // console.log(user);
    const publication = {
      ...data, // tout ce qu'il y a dans data
      date: new Date(),
      userId: user.id,
      nbLike : 0,
      auteur : user.pseudo
    };
mutation.mutate(publication);
};
const mutation = useMutation({
    mutationFn: (publication) => axios.post("http://localhost:3000/publications", publication),
    onError: () => toast.error("Une erreur est survenue..."),
    onSuccess: () => {
      toast.success("Merci pour votre publication"); // Corrige ici avec "toast.success"
      reset(); // Reset du formulaire après succès
queryClient.invalidateQueries("publications") // permet d'invalider la requete et donc de refaire une requête
    },
  });

    ////// REMPLACE par mutation de React Query

    // console.log(publication);
//     axios //enregistrement de la publication
//       .post("http://localhost:3000/publications", publication)
//       .then((res) => {
//         //   console.log(res);
//         toast.success("Merci pour votre publication");
//         reset(); // vient de useForm
//       }
//     ).catch((err) => { //console.log(err); 
//         toast.error("Aie Caramba")
//     });
  
;

  return (
    <Stack width={"60%"} margin={"auto"}>
      <h1>Ajouter une publication</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Qu'avez vous à nous partager aujourd'hui?"
          variant="outlined"
          fullWidth
          margin="normal"
          type="text"
          multiline
         
          rows={4}
          {...register("publication", {
            required : "Veuillez entre votre texte",
            minLength: 5
          })}
        ></TextField>
        <TextField
          label="Saisissez l'url de votre image"
          variant="outlined"
          margin="normal"
          fullWidth
          type="text"
         
          {...register("image",  {
            required : "Veuillez entre votre url",
            minLength: 5
          })}
        ></TextField>

        <Button variant="contained" type="submit">Publier</Button>
      </form>
    </Stack>
  );
}
