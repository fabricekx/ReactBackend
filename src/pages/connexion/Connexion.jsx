import React from "react";
import { Box, Stack, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate, Link } from 'react-router-dom'; 
import { useEffect } from "react";
export default function connexion() {
  useEffect(() => {if(localStorage.getItem("utilisateur"))
    {navigate("/dashboard")} // si on a déjà un utilisateur, on va directement à dashborad
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // handleSubmit va vérifier les donnée, on va l'appeler sur les champs
  //   tandis que register va permettre de vérifier chaque champs (taille, obligatoire, type etc.)
  const navigate=useNavigate();
  
  const onSubmit = (data) => {
    
    // utilisation d'axios pour faire un post en bdd
    axios
      .get( // on vérifie d'aboird si un utilisateur a déjà ce mail et ce mots de passe
        `http://localhost:3000/utilisateurs?email=${data.mailUtilisateur}&password=${data.password}`
      )
      .then((res) =>
        
        { ;
          if (res.data.length >0) {
            toast.success("Connexion réussie");
            // si le password en base = le passaword saisi
            localStorage.setItem("utilisateur", JSON.stringify(res.data[0]));
            // console.log(localStorage)
            // on stock en local les données de l'utilisateur connecté (voir inspecteur, applications, localStorage)
            setTimeout(() => {
              navigate("/dashboard");
          }, 2000); // 2000 millisecondes = 2 secondes
          } else {  toast.error("Mots de passe ou identifiant incorrect");
          }
        }
          
          )
          
        
      ;
        }
  ;

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
      bgcolor={"grey"}
    >
      <Box bgcolor={"wheat"} width={"500px"} padding={"10px"}>
        <Typography variant="h4">Connexion</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"column"} gap={"5px"}>
            <TextField
              id="email"
              type={"email"}
              autoComplete="mailUtilisateur"
              fullWidth
              margin={"normal"}
              label="Veuillez saisir votre email"
              variant="outlined"
              {...register("mailUtilisateur", {
                required: true,
                minLength: {
                  value: 5,
                  message: "Votre email doit faire au moins 5 caractères",
                },
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <TextField
              id="password"
              type={"password"}
              autoComplete="new-password"
              fullWidth
              margin={"normal"}
              label="Veuillez saisir un mot de passe"
              variant="outlined"
              {...register("password", {
                required: true,
                minLength: {
                  value: 3,
                  message:
                    "Votre password faire au moins 8 caractères, une majuscule, une minuscule, un nombre et un caractère spécial",
                },
                //  pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
              })}
              // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
            />
            
            
          </Stack>
          <Button sx={{ marginTop: 2 }} type="submit" variant="contained">
            Connexion
          </Button>
        </form>
        <Typography padding={"8px"}>Pas de compte? <Link   to="/inscription">Créer un compte</Link>
        </Typography> 

      </Box>
    </Stack>
  );
}
