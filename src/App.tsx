import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Login } from "./views/Login";
import "./index.css";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PolygonCreator } from "./components/PoligonCreator";
import { Register } from "./views/Register";
import { useAuth } from "./context/AuthContext";
import { Home } from "./views/Home";
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

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
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
      <Router>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
             {/*  <Route path="/crop/lots" element={<Lotes />} />
              <Route path="/crop/trees" element={<Plantas />} />
              <Route path="/crop/readings" element={<Lecturas/>} />
              <Route path="/crop/production" element={<Produccion/>} />
              <Route path="/weather/sync" element={<Sincronizaciones/>} />
              <Route path="/auth/users" element={<Usuarios/>} />
              <Route path="/auth/porfile" element={<Porfile/>} />
              <Route path="/auth/role" element={<Roles/>} />
              <Route path="/pred/averange" element={<Estimaciones/>} />
              <Route path="/pred/analytics" element={<Estadisticas/>} /> */}
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/auth/login" />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/auth/login" />} />
              
            </>
          )}
          <Route path="*" element={<p>La ruta no existe</p>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
