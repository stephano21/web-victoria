import React from 'react';
import { Button } from 'react-bootstrap';

interface AvatarGeneratorProps {
  initials: string;
}

export const AvatarGenerator: React.FC<AvatarGeneratorProps> = ({ initials }) => {
  // Generar un color hexadecimal basado en las iniciales
  const generarColorHex = (str: string): string => {
    const hashCode = Array.from(str).reduce((acc, char) => {
      const code = char.charCodeAt(0);
      return (acc << 5) - acc + code;
    }, 0);
  
    const hue = (hashCode & 0x00FFFFF) % 360; // Asegura que el valor esté en el rango de colores (0-359)
    const saturation = 70; // Puedes ajustar esto según tus preferencias
    const lightness = 60; // Puedes ajustar esto según tus preferencias
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  
  // Establecer el estilo dinámicamente
  const avatarStyle: React.CSSProperties = {
    backgroundColor: generarColorHex(initials),
    color: '#ffffff', // Color del texto en el avatar (blanco en este caso)
    textAlign: 'center',
    fontSize: '80px', // Tamaño de fuente más grande
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    lineHeight: '50px', // Ajusta según sea necesario para centrar verticalmente
    width: '150px', // Hacer el círculo más grande
    height: '150px', // Hacer el círculo más grande
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Button variant="light" style={avatarStyle}>
      {initials.toLocaleUpperCase()}
    </Button>
  );
};

