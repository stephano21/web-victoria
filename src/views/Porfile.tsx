import React from 'react';
import MapContainer from '../components/Map'; // Asegúrate de importar el componente MapContainer desde el lugar correcto
import { BaseLayout } from '../components/BaseLayout';
import { Card, Placeholder, Spinner } from 'react-bootstrap';

export const Porfile: React.FC = () => {


  return (
    <BaseLayout PageName='Perfil'>
      <div className="container">
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://placehold.co/600x400" />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>
      </div>
      
    </BaseLayout>
  );
};