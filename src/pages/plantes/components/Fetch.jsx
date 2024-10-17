import React, { useState, useEffect } from 'react';

export default function Fetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"

{`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  // Gestion des états de la requête
  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  return (
    <div>
      <h2>Mes données :</h2>
      {data && data.data.length > 0 ? (
        data.data.map((plant) => (
          <div key={plant.id}>
            <h3>{plant.common_name} ({plant.scientific_name})</h3>
            <img src={plant.image_url} alt={plant.common_name} style={{ maxWidth: '200px' }} />
            <p>Famille : {plant.family_common_name}</p>
            <p>Synonymes : {plant.synonyms.join(', ')}</p>
          </div>
        ))
      ) : (
        <p>Aucune donnée disponible</p>
      )}
    </div>
  );
}
