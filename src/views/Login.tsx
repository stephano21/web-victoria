import React, { useContext } from 'react';
import { CardLogin } from "../components/CardLogin";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AlertContext, AlertType } from '../context/AlertContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert  } from '../context/Alerts/AlertComponent';
import { useLoader } from '../hooks/useLoader';

export const Login = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { addAlert } = useContext(AlertContext); // Accede al contexto de alertas
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, showLoader, hideLoader } = useLoader();
  const handleLogin = (username: string, password: string) => {
    // Realiza la lógica de autenticación aquí, por ejemplo:
    if (username === 'admin' && password === '123') {
      /* addAlert(AlertType.SUCCESS, 'Inicio de sesión exitoso'); */
      //alert('Inicio de sesión exitoso');
      showLoader();
    } else {
      alert('Nombre de usuario o contraseña incorrectos');
    }
  };
  return (
    <div>
      <CardLogin onLogin={handleLogin}></CardLogin>
    </div>
  );
}
