import { useState } from 'react';

export const usePlantaState = () => {
  const [Planta, setPlanta] = useState({
    usuarios: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setPlanta({
      ...Planta,
      [name]: value,
    });
  };

  const resetPlanta = () => {
    setPlanta({
      usuarios: "",
    });
  };

  return { Planta, handleInputChange, resetPlanta };
};
