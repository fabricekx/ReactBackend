import React from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WindChart = ({ windData }) => {
  // Transformation des données de vent
  const transformedData = windData.time.map((time, index) => {
    const windSpeed = windData.wind_speed_10m[index];
    const windGusts = windData.wind_gusts_10m[index];

    // Conversion de la chaîne de date en objet Date
    const date = new Date(time);
    const hours = date.getHours();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });

    // Format personnalisé : Affiche "Jour Mois" pour 00h, sinon affiche juste l'heure
    const formattedTime = hours === 0 ? `${day} ${month}` : `${hours}`;


    return {
      time: formattedTime,  // Heure ou jour/mois
      windSpeed,            // Vitesse du vent
      windGusts,           // Rafales
    };
  });
  const getGradientForMaxSpeed = (maxSpeed) => {
    if (maxSpeed <= 2) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' }, // Blue for 0 knots
        { offset: '100%', stopColor: '#74FA59' } // Turquoise for 2 knots
      ];
    } else if (maxSpeed <= 5) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '50%', stopColor: '#74FA59' },
        { offset: '100%', stopColor: '#65B626' } // Green for 5 knots
      ];
    } else if (maxSpeed <= 8.5) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '33%', stopColor: '#74FA59' },
        { offset: '66%', stopColor: '#65B626' },
        {offset:"100%", stopColor:"#ffd700"} // jaune for 8.5 knots
      ];
    } else if (maxSpeed <= 13.5) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '25%', stopColor: '#74FA59' },
        { offset: '50%', stopColor: '#65B626' },
        {offset:"75%", stopColor:"#ffd700"},
        {offset:"100%", stopColor:"#ff8c00"} // orange pour 13.5 knots
      ];
    }else if (maxSpeed <= 19.5) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '20%', stopColor: '#74FA59' },
        { offset: '40%', stopColor: '#65B626' },
        {offset:"60%", stopColor:"#ffd700"},
        {offset:"80%", stopColor:"#ff8c00"} ,
        {offset:"100%" ,stopColor:"#FB3535"} // rouge pour 19.5 knots
      ];
    }else if (maxSpeed <= 24.5) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '16.6%', stopColor: '#74FA59' },
        { offset: '33.2%', stopColor: '#65B626' },
        {offset:"50%", stopColor:"#ffd700"},
        {offset:"66.4%", stopColor:"#ff8c00"} ,
        {offset:"83%" ,stopColor:"#FB3535"},
        {offset:"100%", stopColor:"#B7273F"} // rose pour 24.5knots
      ];
    }else if (maxSpeed <= 30.5) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '14.3%', stopColor: '#74FA59' },
        { offset: '28.6%', stopColor: '#65B626' },
        {offset:"42.5%", stopColor:"#ffd700"},
        {offset:"57%", stopColor:"#ff8c00"} ,
        {offset:"71.3%" ,stopColor:"#FB3535"},
        {offset:"86%", stopColor:"#B7273F"},
        {offset:"100%" , stopColor:"#8C27B7"} // violet pour 30.5 knots
      ];
    }else if (maxSpeed <= 37) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '12.5%', stopColor: '#74FA59' },
        { offset: '25%', stopColor: '#65B626' },
        {offset:"37.5%", stopColor:"#ffd700"},
        {offset:"50%", stopColor:"#ff8c00"} ,
        {offset:"62.5%" ,stopColor:"#FB3535"},
        {offset:"75%", stopColor:"#B7273F"},
        {offset:"87.5%" , stopColor:"#8C27B7"},
        {offset:"100%" ,stopColor:"#3827B7"}// Bleu foncé 37 knots
      ];
    }else if (maxSpeed <= 44) {
      return [
       { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '10%', stopColor: '#74FA59' },
        { offset: '20%', stopColor: '#65B626' },
        {offset:"30%", stopColor:"#ffd700"},
        {offset:"40%", stopColor:"#ff8c00"} ,
        {offset:"50%" ,stopColor:"#FB3535"},
        {offset:"60%", stopColor:"#B7273F"},
        {offset:"70%" , stopColor:"#8C27B7"},
        {offset:"80%" ,stopColor:"#3827B7"},
        {offset:"90%", stopColor:"#02010D"} ,
        {offset:"100%", stopColor:"#FB3535"}//   rouge vif knots
      ];
    }
    // Add more conditions for each range like 8.5, 13.5, 19.5, etc.
    else {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '9.1%', stopColor: '#74FA59' },
        { offset: '18.2%', stopColor: '#65B626' },
        {offset:"27.3%", stopColor:"#ffd700"},
        {offset:"36.4%", stopColor:"#ff8c00"} ,
        {offset:"45.5%" ,stopColor:"#FB3535"},
        {offset:"54.6%", stopColor:"#B7273F"},
        {offset:"63.7%" , stopColor:"#8C27B7"},
        {offset:"72.9" ,stopColor:"#3827B7"},
        {offset:"82%", stopColor:"#02010D"} ,
        {offset:"91.1%", stopColor:"#FB3535"},
        {offset:"100%", stopColor:"#0D0505"} // noir
      ];
    }
  };

  // Inside your component:
const maxSpeed = Math.max(...transformedData.map(d => d.windSpeed));

const gradientStops = getGradientForMaxSpeed(maxSpeed);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart 
        data={transformedData} 
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
         <defs>
    <linearGradient id="windGradient" x1="0" y1="1" x2="0" y2="0">
      {gradientStops.map((stop, index) => (
        <stop key={index} offset={stop.offset} stopColor={stop.stopColor} />
      ))}
    </linearGradient>
  </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time"
          label={{ value: 'Heures', position: 'insideBottomRight', offset: 0 }} 
          tick={{ fontSize: 12, angle: -45 }} // Réduire la taille de la police et rotation des ticks
          interval={3} // Forcer l'affichage de tous les ticks
        />
        <YAxis 
          label={{ value: 'Vitesse du vent (nœuds)', angle: -90, position: 'insideLeft' }} 
          // domain={[0, 50]} // Fixer l'axe des Y entre 0 et 50
        />
        <Tooltip />
        <Legend />
        
        <Area 
          type="monotone" 
          dataKey="windSpeed" 
          stroke="#8884d8" 
          fillOpacity={1} 
          fill="url(#windGradient)" // Utiliser le même dégradé pour windSpeed
        />
        <Line 
          type="monotone" 
          dataKey="windGusts" 
          stroke="#82ca9d" // Couleur de la ligne des rafales
          dot={false} // Désactiver les points sur la ligne
        />
      
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default WindChart;
