import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { GoogleMapsProvider } from "./context/MapContext";
import { LoaderProvider } from "./context/LoaderContext";
import { AlertProvider } from "./context/Alerts/AlertProvider";
import ErrorHandler from "./components/ErrorHandler";
ReactDOM.render(
  <React.StrictMode>
    <ErrorHandler>
      <LoaderProvider>
        <AlertProvider>
          <AuthProvider>
            <GoogleMapsProvider
              containerId="map-container"
              initialCoordinates={{ lat: 0, lng: 0 }}
              initialZoom={8}
            >
              <AlertProvider>
                <App />

              </AlertProvider>
            </GoogleMapsProvider>
          </AuthProvider>
        </AlertProvider>
      </LoaderProvider>
    </ErrorHandler>

  </React.StrictMode>,
  document.getElementById("root")
);
