import React, { useEffect, useState } from "react";
import { BaseLayout } from "../components/BaseLayout";
import { Card, CardText, CardTitle } from "react-bootstrap";
import {Analytics} from '../hooks/useAnalytics'
import { IHome } from "../interfaces/AnalytisInterfaces";
export const Home = () => {
  const [Home, setHome]= useState<IHome>();
  const {GetHomeInfo} = Analytics();
  const LoadData = async () => {
    setHome(await GetHomeInfo());
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos
    LoadData()
  }, []);
const data =[
  {
    class: 'Primary',
    area:'Usuarios',
    icon: 'bi bi-people',
    title: 'Usuarios registrados',
    message:`${Home?.Usuarios} usuarios nuevos`,
  },
  {
    class: 'success',
    icon: 'bi bi-book',
    area:'Lecturas',
    title: 'Lecturas del mes',
    message:Home?.Lecturas,
  },
  {
    class: 'danger',
    icon: 'bi bi-arrow-repeat',
    area:'Sincronización',
    title: 'Sincronizacion con Arable',
    message:'La sincronizacion diaria ha fallado!',
  }

]

  return (
    <BaseLayout>
      <div className="container" >
        <div className="row">
          {data.map((variant) => (
            <Card
              bg={variant.class.toLowerCase()}
              key={variant.class}
              text={variant.class.toLowerCase() === 'light' ? 'dark' : 'white'}
              style={{ width: '15rem', margin: 2, }}
              className="mb-2"
            >
              <Card.Header><i className={variant.icon}></i> {variant.area}</Card.Header>
              <Card.Body>
                <CardTitle as={Card.Title} animation="glow">
                  {variant.title}
                </CardTitle>
                <CardText>{variant.message}</CardText>
              </Card.Body>
            </Card>

          ))}
          <br />
        </div>

      </div>
    </BaseLayout>
  );
};
