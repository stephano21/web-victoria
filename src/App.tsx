import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Login } from "./views/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import 'rsuite/dist/rsuite.min.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PolygonCreator } from "./components/PoligonCreator";
import { Register } from "./views/Register";
import { useAuth } from "./context/AuthContext";
import { Home } from "./views/Home";
import { Likes } from "./views/Likes";
import { Lotes } from "./views/Lotes";
import { Plantas } from "./views/Plantas";
import { Sincronizaciones } from "./views/Sincronizaciones";
import { Usuarios } from "./views/Usuarios";
import { Estimaciones } from "./views/Estimaciones";
import { Estadisticas } from "./views/Estadisticas";
import { Porfile } from "./views/Porfile";
import { Lecturas } from "./views/Lecturas";
import { Produccion } from "./views/Produccion";
import { Roles } from "./views/Roles";
import { Proyectos } from "./views/Proyectos";
import { NotFoundPage } from "./views/NotFoundPage";

const App: React.FC = () => {
  const { isAuthenticated, UserData } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, [isAuthenticated]);

  if (!isReady) {
    return null;
  }
  console.log(isAuthenticated)

  const publicUrl = process.env.PUBLIC_URL || ""

  return (
    <>
      <Router>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path={`${publicUrl}/`} element={<Navigate to={`${publicUrl}/home`} />} />
              <Route path={`${publicUrl}/home`} element={<Home />} />
              <Route path="*" element={<NotFoundPage/>} />
              <Route path={`${publicUrl}/auth/porfile`} element={<Porfile />} />
              <Route path={`${publicUrl}/auth/login`} element={<Navigate to={`${publicUrl}/home`} />} />
              {UserData && UserData.rol !== null && (
                <Fragment>
                  {UserData?.rol !== null && UserData?.rol !== "Estudiante" && UserData?.rol !== "Tecnico" && (
                    <>
                      <Route path={`${publicUrl}/crop/lots`} element={<Lotes />} />
                      <Route path={`${publicUrl}/crop/trees`} element={<Plantas />} />
                      <Route path={`${publicUrl}/crop/production`} element={<Produccion />} />
                      <Route path={`${publicUrl}/crop/proyects`} element={<Proyectos />} />
                      <Route path={`${publicUrl}/weather/sync`} element={<Sincronizaciones />} />
                      <Route path={`${publicUrl}/auth/users`} element={<Usuarios />} />
                      <Route path={`${publicUrl}/auth/role`} element={<Roles />} />
                      <Route path={`${publicUrl}/pred/averange`} element={<Estimaciones />} />
                      <Route path={`${publicUrl}/pred/analytics`} element={<Estadisticas />} />
                    </>
                  )}
                  <Route path={`${publicUrl}/crop/readings`} element={<Lecturas />} />
                </Fragment>
              )}

            </>
          ) : (
            <>
              <Route path={`${publicUrl}/`} element={<Navigate to={`${publicUrl}/auth/login`} />} />
              <Route path={`${publicUrl}/home`} element={<Navigate to={`${publicUrl}/auth/login`} />} />
              <Route path={`${publicUrl}/auth/login`} element={<Login />} />
              <Route path={`${publicUrl}/auth/register`} element={<Register />} />
              <Route path={`${publicUrl}/uae/likes`} element={<Likes />} />
              <Route path="*" element={<NotFoundPage/>} />
            </>
          )}
          <Route path="*" element={<p>La ruta no existe</p>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
