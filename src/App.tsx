import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Login } from "./views/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PolygonCreator } from "./components/PoligonCreator";
import { Register } from "./views/Register";
import { useAuth } from "./context/AuthContext";
import { Home } from "./views/Home";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, [isAuthenticated]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <Router>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cat/lotes" element={<PolygonCreator />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/auth/login" />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="*" element={<p>Not found</p>} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
};

export default App;
