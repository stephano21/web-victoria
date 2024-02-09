import { useState } from 'react';
import { useRequest } from '../api/UseRequest';
import { Endpoints } from '../api/routes';
import { IAnalytics, IHome } from '../interfaces/AnalytisInterfaces';
export const Analytics = () => {
    const { getRequest } = useRequest();
    const [Estadisticas, setEstadisticas] = useState<IAnalytics>();
    const [Home, setHome] = useState<IHome>();
    const GetEstadisticas = async (): Promise<IAnalytics> => {
        try {
            const Response = await getRequest<IAnalytics>(Endpoints.Analitics);
            setEstadisticas(Response);
            return Response; // Devuelve el arreglo transformado
        } catch (error) {
            console.error('Error al obtener Estadisticas:', error);
            throw error;
        }
    };
    const GetHomeInfo = async (): Promise<IHome> => {
        try {
            const Response = await getRequest<IHome>(Endpoints.Home);
            setHome(Response);
            return Response; // Devuelve el arreglo transformado
        } catch (error) {
            console.error('Error al obtener HomeAnalytics:', error);
            throw error;
        }
    };
    return {
        GetEstadisticas,
        GetHomeInfo,
        Estadisticas,
        Home
    };
};
