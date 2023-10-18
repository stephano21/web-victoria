import React, { createContext, useState } from "react";
import { LoaderAnimation } from "./../views/Loader";
// Definir el tipo de estado del loader
type LoaderContextProps = {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

// Crear el contexto de loader
export const LoaderContext = createContext({} as LoaderContextProps);

// Proveedor del contexto de loader
export const LoaderProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => {
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {isLoading && <LoaderAnimation />}
      {children}
    </LoaderContext.Provider>
  );
};
