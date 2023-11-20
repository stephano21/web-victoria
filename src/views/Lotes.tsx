import React from 'react';
import MapContainer from './../components/Map'; // Asegúrate de importar el componente MapContainer desde el lugar correcto
import { BaseLayout } from '../components/BaseLayout';
import { Spinner } from 'react-bootstrap';

export const Lotes: React.FC = () => {
  const center = { lat: 40.7128, lng: -74.0060 }; // Coordenadas de Nueva York
  const initialZoom = 12;

  const polygons = [
    {
      paths: [
        { lat: 40.7128, lng: -74.0060 },
        { lat: 40.7128, lng: -74.0160 },
        { lat: 40.7028, lng: -74.0160 },
        { lat: 40.7028, lng: -74.0060 },
      ],
      options: {
        fillColor: 'blue',
        fillOpacity: 0.5,
        strokeColor: 'red',
        strokeWeight: 2,
      },
    },
    // Otros polígonos...
  ];

  return (
    <BaseLayout PageName='Lotes'>
      <div className="row">
          <div className="col-md-12 text-center">
            <h1>Pantalla en progreso...<Spinner animation="border" variant='success' /></h1>
          </div>
        </div>
      <MapContainer initialCenter={center} polygons={polygons} />
    </BaseLayout>
  );
};