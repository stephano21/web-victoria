import React, { useState } from 'react';
import { AlertContext, Alert, AlertType, AlertContextType } from './../AlertContext'; // Asegúrate de importar los tipos correctamente

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (type: AlertType, message: string) => {
    const newAlert: Alert = {
      id: Date.now(),
      type,
      message,
    };

    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  const removeAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  const contextValue: AlertContextType = {
    alerts,
    addAlert,
    removeAlert,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};
