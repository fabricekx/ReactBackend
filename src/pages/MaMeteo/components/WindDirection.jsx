// ce composant n'est plus utilisé, la direction du vent est directement intégrée dans la légende du graphique

import React from 'react'
import { FaArrowUp } from 'react-icons/fa'; // Assure-toi d'importer l'icône de flèche

export default function WindDirection({windDirectionData}) {
  // Composant pour afficher une flèche pivotante en fonction de la direction du vent
const WindDirectionDisplay = ({ windDirectionData }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {windDirectionData.map((data, index) => (
        <div key={index} style={{ margin: '0 10px', textAlign: 'center' }}>
          <FaArrowUp style={{ transform: `rotate(${data.windDirection}deg)`, transition: 'transform 0.3s' }} />
          <p>{data.time}</p>  {/* Affichage du moment associé */}
        </div>
      ))}
    </div>
  );
};
  return (
    <div>
            <WindDirectionDisplay windDirectionData={windDirectionData} />

    </div>
  )
}
