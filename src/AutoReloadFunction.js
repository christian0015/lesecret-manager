import React, { useEffect } from 'react';

const AutoReload = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      window.location.reload();  // Recharger la page
    }, 200);  // 200 ms

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);

  return null;  // Ce composant n'a pas besoin de rendre quoi que ce soit
};

export default AutoReload;
