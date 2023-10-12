import React, { useContext } from 'react';
import { CardLogin } from "../components/CardLogin";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AlertContext, AlertType } from '../context/AlertContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert  } from '../context/Alerts/AlertComponent';
import { useLoader } from '../hooks/useLoader';
import { useRequest } from '../api/UseRequest';
import { TokenResponse } from '../interfaces/AuthInterface';

export const Login = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { addAlert } = useContext(AlertContext); // Accede al contexto de alertas
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, showLoader, hideLoader } = useLoader();
  const { postRequestToken } = useRequest();
  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await postRequestToken<TokenResponse>({ username, password });
      console.log(response.access_token);
      // addAlert(AlertType.SUCCESS, 'Inicio de sesión exitoso');
      showLoader();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  return (
    <div>
      <CardLogin onLogin={handleLogin}></CardLogin>
    </div>
  );
}
