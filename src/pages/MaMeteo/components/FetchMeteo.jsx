import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import WindChart from './WindChart';

// Fonction pour récupérer les données météo via Axios
const latitude = "43.5";
const longitude = "7.0127"
const url =  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}longitude=${longitude}&current=wind_direction_10m,wind_gusts_10m&hourly=wind_speed_10m&wind_speed_unit=kn&timezone=Europe%2FBerlin&forecast_days=3&models=meteofrance_seamless`

const fetchWeatherData = async () => {
  const response = await axios.get(
    'https://api.open-meteo.com/v1/forecast?latitude=43.5513&longitude=7.0127&current=wind_direction_10m,wind_gusts_10m&hourly=wind_speed_10m,wind_direction_10m,wind_gusts_10m&wind_speed_unit=kn&timezone=Europe%2FBerlin&forecast_days=3&models=meteofrance_seamless'
  );
  return response.data;
};

export default function Weather() {
  const queryClient = useQueryClient(); // Pour utiliser les fonctionnalités avancées comme l'invalidation du cache

  // Utilisation de useQuery pour récupérer les données de l'API
  const { data: weatherData, error, isLoading } = useQuery({
    queryKey: ['weatherData'], // Clé unique pour cette requête
    queryFn: fetchWeatherData, // Fonction qui effectue la requête
  });
console.log(weatherData);
  if (isLoading) return <div>Chargement des données...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  return (
    <div>
      <h2>Données météo</h2>
      {weatherData && (
        <div>
      
          <WindChart windData={weatherData.hourly}></WindChart>
        </div>
      )}
      
    </div>
  );
}
