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
  return (
    <>
      <Router basename="/planttrace">
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/planttrace/" element={<Navigate to="/planttrace/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<NotFoundPage/>} />
              <Route path="/planttrace/auth/porfile" element={<Porfile />} />
              {UserData && UserData.rol !== null && (
                <Fragment>
                  {UserData?.rol !== null && UserData?.rol !== "Estudiante" && UserData?.rol !== "Tecnico" && (
                    <> <Route path="/planttrace/crop/lots" element={<Lotes />} />
                      <Route path="/planttrace/crop/trees" element={<Plantas />} />
                      <Route path="/planttrace/crop/production" element={<Produccion />} />
                      <Route path="/planttrace/crop/proyects" element={<Proyectos />} />
                      <Route path="/planttrace/weather/sync" element={<Sincronizaciones />} />
                      <Route path="/planttrace/auth/users" element={<Usuarios />} />
                      <Route path="/planttrace/auth/role" element={<Roles />} />
                      <Route path="/planttrace/pred/averange" element={<Estimaciones />} />
                      <Route path="/planttrace/pred/analytics" element={<Estadisticas />} />
                    </>
                  )}
                  <Route path="/planttrace/crop/readings" element={<Lecturas />} />
                </Fragment>
              )}

            </>
          ) : (
            <>
              <Route path="/planttrace" element={<Navigate to="/auth/login" />} />
              <Route path="/planttrace/auth/login" element={<Login />} />
              <Route path="/planttrace/auth/register" element={<Register />} />
              <Route path="/planttrace/uae/likes" element={<Likes />} />
              <Route path="*" element={<NotFoundPage/>} />

            </>
          )}
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
