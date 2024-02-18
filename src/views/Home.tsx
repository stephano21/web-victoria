import React, { Fragment, useEffect, useState } from "react";
import { BaseLayout } from "../components/BaseLayout";
import { Card, CardText, CardTitle } from "react-bootstrap";
import { useAnalytics } from '../hooks/useAnalytics'
import { IHome } from "../interfaces/AnalytisInterfaces";
import { useAuth } from "../context/AuthContext";
import { Endpoints } from "../api/routes";
import { useRequest } from "../api/UseRequest";
import { Progress, Col } from "rsuite";
import useToaster from "../hooks/useToaster";
export const Home = () => {
  const [Home, setHome] = useState<IHome>();
  const { GetHomeInfo } = useAnalytics();
  const { getRequest } = useRequest();
  const { notify } = useToaster()
  const LoadData = async () => {
    setHome(await GetHomeInfo());
  };
  const { UserData } = useAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos
    LoadData()
    notify(
      `${Home?.Usuarios} usuarios nuevos`,
      "info",
      { notificationProps: { header: "Usuarios" } }
    )
  }, []);
  const HandeleButton = () => getRequest(Endpoints.Test);
  const data = [
    {
      class: 'Primary',
      area: 'Usuarios',
      icon: 'bi bi-people',
      title: 'Usuarios registrados',
      message: `${Home?.Usuarios} usuarios nuevos`,
    },
    {
      class: 'success',
      icon: 'bi bi-book',
      area: 'Lecturas',
      title: 'Lecturas del mes',
      message: Home?.Lecturas,
    },
    {
      class: 'danger',
      icon: 'bi bi-arrow-repeat',
      area: 'Sincronización',
      title: 'Sincronizacion con Arable',
      message: 'La sincronizacion diaria ha fallado!',
    }

  ]
  const status = Home?.Lecturas === 100 ? 'success' : null;
  const color = Home?.Lecturas === 100 ? '#52c41a' : '#3385ff';
  return (
    <BaseLayout>
      <div className="container" >
        {UserData && UserData?.rol !== null && (
          <div className="row">
            <button type="button" className="btn btn-warning" onClick={HandeleButton}>Test </button>
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
            <Col md={6}>
              <div style={{ width: 120, marginTop: 10 }}>
                <Progress.Circle percent={Home?.Lecturas} strokeColor={color} status={status} />
              </div>
            </Col>
          </div>
        )}
        {UserData && UserData?.rol === null && (
          <Fragment>
            <h1> <i className="bi bi-person-fill-gear"></i> Permisos no asignados</h1>
            <h5>Espera a que un administrador te asigne los permisos necesarios</h5>
          </Fragment>
        )}
      </div>
    </BaseLayout>
  );
};
