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
  const [Home, setHome] = useState<IHome>({
    Date: new Date().toISOString().split('T')[0],
    Usuarios: 0,
    Haciendas: [
      {
        Hacienda: '',
        Lecturas: 0,
        Proyects: [
          {
            Proyect: '',
            Lecturas: 0
          }
        ]
      }
    ]
  });
  const { GetHomeInfo } = useAnalytics();
  const { getRequest } = useRequest();
  const { notify } = useToaster()
  const LoadData = async () => {
    console.log(await GetHomeInfo())
    await setHome(await GetHomeInfo());
  };
  const GetStatus = (value: number | null) => value ? value === 100 ? 'success' : 'active' : 'fail';
  const GetColor = (value: number | null) => value === 100 ? '#52c41a' : '#3385ff';
  const { UserData } = useAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos
    LoadData()
    data.forEach((item) => {
      notify(
        item?.message,
        item?.class === "danger" ? "error" : "info",
        {
          notificationProps: {
            header: item?.area
          },
          pushOptions: { duration: 100000 }
        }
      )
    })
  }, []);
  const HandeleButton = () => getRequest(Endpoints.PredictSync);
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
  const RenderAnalytics = () => {
    return (
      <Fragment>
        <div className="row">
          {Home.Haciendas.length > 1 ? (Home.Haciendas.map((item) => (
            <div className="col-md-6">
              <div className={`card text-dark mb-3`} >
                <div className="card-header"><i className="bi bi-house-gear-fill"></i> {item.Hacienda}</div>
                <div className="card-body">
                  <div className="d-flex justify-content-center ">
                    <Col md={6}>
                      <div style={{ width: 120, marginTop: 10 }}>
                        <Progress.Circle percent={item.Lecturas} strokeColor={GetColor(item.Lecturas)} status={GetStatus(item.Lecturas)} />
                        <p>Lecturas {MonthToString(Home?.Date)}</p>
                      </div>
                    </Col>
                  </div>
                  <div className="d-flex justify-content-center ">
                    {item.Proyects?.map((item) => (
                      <Col md={6}>
                        <Progress.Circle percent={item.Lecturas} strokeColor={GetColor(item.Lecturas)} status={GetStatus(item.Lecturas)} />
                        <p>{item.Proyect} {MonthToString(Home?.Date)}</p>
                      </Col>
                    )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
          ) : (Home.Haciendas.map((item) => (
            <>
              <div className="d-flex justify-content-center ">
                <Col md={6}>
                  <div style={{ width: 120, marginTop: 10 }}>
                    <Progress.Circle percent={item.Lecturas} strokeColor={GetColor(item.Lecturas)} status={GetStatus(item.Lecturas)} />
                    <p>Lecturas {MonthToString(Home?.Date)}</p>
                  </div>
                </Col>
              </div>
              <div className="d-flex justify-content-center ">
                {item.Proyects?.map((item) => (
                  <Col md={3}>
                    <Progress.Circle percent={item.Lecturas} strokeColor={GetColor(item.Lecturas)} status={GetStatus(item.Lecturas)} />
                    <p>{item.Proyect} {MonthToString(Home?.Date)}</p>
                  </Col>
                )
                )}
              </div>
            </>))
          )}
        </div>
      </Fragment >
    )
  }

  return (
    <BaseLayout>
      <div className="container" >
        {UserData && UserData?.rol !== null && (
          <Fragment>
            {/* <div className="d-flex justify-content-center">
              {process.env.REACT_APP_DEBUGG && (
                <button type="button" className="btn btn-warning" onClick={HandeleButton}>Test </button>
              )}
              <Col md={6}>
                <div style={{ width: 120, marginTop: 10 }}>
                  <Progress.Circle percent={Home?.Lecturas} strokeColor={color} status={status} />
                  <p>Lecturas {MonthToString(Home?.Date)}</p>
                </div>
              </Col>
            </div>
            <div className="d-flex justify-content-center ">
            {Home && Home.Proyects?.map((item) => (
                <Col md={3}>
                  <Progress.Circle  percent={item.Lecturas} strokeColor={color} status={status} />
                  <p>{item.Proyect} {MonthToString(Home?.Date)}</p>
                </Col>
              )
              )}
            </div> */}
            {RenderAnalytics()}
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
