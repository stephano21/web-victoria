import React, { useEffect, useState } from 'react';
import MapContainer from '../components/Map'; // Asegúrate de importar el componente MapContainer desde el lugar correcto
import { BaseLayout } from '../components/BaseLayout';
import { Card, Placeholder, Spinner } from 'react-bootstrap';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { IUser } from '../interfaces/AuthInterface';
import { AvatarGenerator } from '../components/AvatarGenerator';

export const Porfile: React.FC = () => {
  const [data, setData] = useState<IUser>();
  const { getRequest } = useRequest();
  const GetData = async () => {
    await getRequest<IUser>(Endpoints.perfil)
      .then((e) => {
        setData(e)
        console.log(e);
      })
      .catch((error) => alert(error));
  };
  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos
    GetData();
  }, []);

  return (
    <BaseLayout PageName='Perfil'>
      <div className="container">
        <div className="mt-1 row justify-content-center">
          <Card style={{ width: '18rem' }}>
            {data ? (
              <div className="mt-1 row justify-content-center">

                <AvatarGenerator initials={data ? data?.first_name.slice(0, 1) + data?.last_name.slice(0, 1) : "UN"} />
              </div>
            ) : (
              <Card.Img variant="top" src="https://placehold.co/600x400" />
            )}

            <Card.Body>
              {data ? (
                <>
                  <Card.Title>{data.first_name + ' ' + data.last_name}</Card.Title>
                  <p><b>Usuario: </b> {data?.username}</p>
                  <p><b>Correo: </b> {data?.email}</p>
                  <p><b>Cédula: </b> {data?.cedula}</p>
                </>
              ) : (
                <>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                  </Placeholder>
                  <Placeholder.Button variant="primary" xs={6} />
                </>

              )}

            </Card.Body>
          </Card>
        </div>

      </div>

    </BaseLayout>
  );
};