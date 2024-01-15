import { useState } from 'react';
import { IRol } from '../interfaces/AuthInterface';
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

export const useRolState = () => {
  const [Rol, setRol] = useState<IRol|null>(null);

  const handleInputChange = (name: string, value: string) => {
    console.log(value)
    console.log(name)
    setRol({
      ...Rol!,
      [name]: value,
    });
  };

  const resetRol = () => {
    setRol(null);
  };

  return { Rol, handleInputChange, resetRol };
};