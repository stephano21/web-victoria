import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface MapContextProps {
  map: google.maps.Map | null;
  initMap: () => void;
}

export const MapContext = createContext({} as MapContextProps);

// Hook personalizado para acceder al contexto
export const useGoogleMaps = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error(
      "useGoogleMaps debe usarse dentro de un GoogleMapsProvider"
    );
  }
  return context;
};

// Componente proveedor del contexto
interface GoogleMapsProviderProps {
  children: ReactNode;
  containerId: string | null; // ID del contenedor del mapa
  initialCoordinates: { lat: number; lng: number }; // Coordenadas iniciales
  initialZoom: number; // Nivel de zoom inicial
}

export const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({
  children,
  containerId,
  initialCoordinates,
  initialZoom,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const initMap = () => {
    const containerElement =
      containerId != null
        ? document.getElementById(containerId)
        : document.getElementById("map");
    if (containerElement) {
      const googleMap = new google.maps.Map(containerElement, {
        center: initialCoordinates,
        zoom: initialZoom,
      });
      setMap(googleMap);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", initMap);
    return () => {
      document.removeEventListener("DOMContentLoaded", initMap);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  });

  return (
    <MapContext.Provider value={{ map, initMap }}>
      {children}
    </MapContext.Provider>
  );
};
