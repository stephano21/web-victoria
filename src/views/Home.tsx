import React, { Fragment, useEffect, useState } from "react";
import { BaseLayout } from "../components/BaseLayout";
import { useAnalytics } from '../hooks/useAnalytics'
import { IHome } from "../interfaces/AnalytisInterfaces";
import { useAuth } from "../context/AuthContext";
import { Endpoints } from "../api/routes";
import { useRequest } from "../api/UseRequest";
import { Progress, Col } from "rsuite";
import { MonthToString } from '../helpers/FormatDate';
import useToaster from "../hooks/useToaster";
export const Home = () => {
  const [Home, setHome] = useState<IHome>();
  const { GetHomeInfo } = useAnalytics();
  const { getRequest } = useRequest();
  const { notify } = useToaster()
  const LoadData = async () => {
    await setHome(await GetHomeInfo());
  };
  const { UserData } = useAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos
    LoadData()
    data.forEach((item) => {
      notify(
        item?.message,
        item?.class == "danger" ? "error" : "info",
        {
          notificationProps: {
            header: item?.area
          },
          pushOptions: { duration: 100000 }
        }
      )
    })
  }, []);
  const HandeleButton = () => getRequest(Endpoints.Test);
  const data = [
    {
      class: 'primary',
      area: 'Usuarios',
      icon: 'bi bi-people',
      title: 'Usuarios registrados',
      message: `${Home?.Usuarios} usuarios nuevos`,
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
          <Fragment>
            <div className="d-flex justify-content-center">
              {process.env.REACT_APP_DEBUGG && (
                <button type="button" className="btn btn-warning" onClick={HandeleButton}>Test </button>
              )}
              <Col md={6}>
                <div style={{ width: 120, marginTop: 10 }}>
                  <Progress.Circle percent={Home?.Lecturas} strokeColor={color} status={status} />
                  <p>Lecturas {MonthToString(new Date().toISOString().split('T')[0])}</p>
                </div>
              </Col>
            </div>
            <div className="d-flex justify-content-center ">
            {Home && Home.Proyects?.map((item) => (
                <Col md={3}>
                  <Progress.Circle  percent={item.Lecturas} strokeColor={color} status={status} />
                  <p>{item.Proyect} {MonthToString(new Date().toISOString().split('T')[0])}</p>
                </Col>
              )
              )}
            </div>
          </Fragment>
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
