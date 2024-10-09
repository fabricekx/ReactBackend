import React from "react";
import { Box, Stack, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";

export default function inscription() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // handleSubmit va vérifier les donnée, on va l'appeler sur les champs
  //   tandis que register va permettre de vérifier chaque champs (taille, obligatoire, type etc.)
  const navigate=useNavigate();
  const onSubmit = (data) => {
    if (data.password !== data.checkPassword) {
      toast.error("Les mots de passe ne correspondent pas!");
    }
const utilisateur= {
    email: data.mailUtilisateur,
    password: data.password,
    pseudo : data.pseudo,
    date: new(Date)
}
    // utilisation d'axios pour faire un post en bdd
    axios
      .get( // on vérifie d'aboird si un utilisateur a déjà ce mail
        `http://localhost:3000/utilisateurs?email=${data.mailUtilisateur}`
      )
      .then((res) =>
        
        { //console.log(res.data)
          if (res.data.length > 0) {
            toast.error("Cet utilisateur existe déjà");
            // si au moins une réponse, le mail existe déjà
          } else {

            axios // alors on peut enregistrer le nouvel utilisateur
            .post("http://localhost:3000/utilisateurs", utilisateur)
            .then((res) => {
            //   console.log(res);
              toast.success("Inscription réussie, veuillez vous connecter");
              
              setTimeout(() => {
                navigate("/connexion");
            }, 2000); // 2000 millisecondes = 2 secondes
       
            })
            .catch((err) => {
              console.log(err);
              toast.error("Une erreur est survenue lors de l'enregistrement");
            });
          }
        }
      );
    
  };

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
      bgcolor={"grey"}
    >
      <Box bgcolor={"wheat"} width={"500px"} padding={"10px"}>
        <Typography variant="h4">Inscription</Typography>
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
            /><TextField
            id="pseudo"
            type={"text"}
            autoComplete="pseudoUtilisateur"
            fullWidth
            margin={"normal"}
            label="Veuillez saisir un pseudo"
            variant="outlined"
            {...register("pseudo", {
              required: true,
              minLength: {
                value: 5,
                message: "Votre pseudo doit faire au moins 5 caractères",
              },
             
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
            <TextField
              id="check-password"
              type={"password"}
              autoComplete="new-password"
              fullWidth
              label="Veuillez confirmer votre mot de passe"
              variant="outlined"
              {...register("checkPassword", {
                required: true,
                minLength: {
                  value: 3,
                  message:
                    "Votre password faire au moins 8 caractères, une majuscule, une minuscule, un nombre et un caractère spécial",
                },
                // pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
              })}
            />
          </Stack>
          <Button sx={{ marginTop: 2 }} type="submit" variant="contained">
            Inscription
          </Button>
        </form>
        <Typography padding={"8px"}>Déjà un compte? <Link  to="/connexion">Connexion</Link></Typography> 

      </Box>
    </Stack>
  );
}
