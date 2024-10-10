import React from 'react';
import {  Area,ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart } from 'recharts';

const WindChart = ({ windData }) => {
    console.log(windData);

  
    // Préparation des données avant de passer au graphique
const transformedData = windData.time.map((time, index) => {
    // On suppose que les données de vent sont ordonnées de la même manière que les heures
    const windSpeed = windData.wind_speed_10m[index];
    const windGusts = windData.wind_gusts_10m[index];
  
    // Conversion de la date en format heure lisible
    const date = new Date(time);
    const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
  
    return {
      time: formattedTime, // Heures formatées
      windSpeed,           // Vitesse du vent
      windGusts            // Rafales
    };
  });

  // Récupérer l'heure actuelle pour la référence
  const now = new Date();
  const currentHour = `${now.getHours()}:${now.getMinutes()}`; // Formater l'heure actuelle
  

  return (
    <ResponsiveContainer width="100%" height={400}>
            <AreaChart 
                data={transformedData} // Utiliser les données transformées
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <defs>
                    <linearGradient id="windSpeedGradient" x1="0" y1="1" x2="0" y2="0"> {/* Inverser les coordonnées pour corriger le dégradé */}
                        <stop offset="0%" stopColor="#00f" />   {/* Bleu pour 0 km/h */}
                        <stop offset="25%" stopColor="#5f9ea0" />  {/* Turquoise pour 12.5 km/h */}
                        <stop offset="50%" stopColor="#ffd700" />  {/* Jaune pour 25 km/h */}
                        <stop offset="75%" stopColor="#ff8c00" />  {/* Orange pour 37.5 km/h */}
                        <stop offset="100%" stopColor="#ff4500" />  {/* Rouge pour 50 km/h */}
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="time" 
                    label={{ value: 'Heures', position: 'insideBottomRight', offset: 0 }} 
                />
                <YAxis 
                    label={{ value: 'Vitesse du vent (km/h)', angle: -90, position: 'insideLeft' }} 
                    domain={[0, 50]} // Fixer l'axe des Y entre 0 et 50
                />
                <Tooltip />
                <Legend />
                      {/* Ligne de référence pour l'heure actuelle */}
                      <ReferenceLine x={currentHour} stroke="red" strokeDasharray="3 3" label="Maintenant" />
                {/* Utilisation du dégradé pour la vitesse du vent */}
                <Area 
                    type="monotone" 
                    dataKey="windSpeed" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#windSpeedGradient)" // Utiliser le dégradé ici
                />
                
                {/* Ajout d'une Area pour les rafales */}
                <Area 
                    type="monotone" 
                    dataKey="windGusts" 
                    stroke="#82ca9d" 
                    fillOpacity={1} 
                    fill="url(#colorWindGusts)" // Vous pouvez créer un dégradé pour les rafales aussi
                />
            </AreaChart>
        </ResponsiveContainer>

  );
};

export default WindChart;
