import { useState } from 'react';
import { useRequest } from '../api/UseRequest';
import { Endpoints } from '../api/routes';
import { ILote, IPlantas, IProyecto, ISelectListItem, IHacienda } from '../interfaces/AuthInterface';
export const Selects = () => {
    const { getRequest } = useRequest();
    const [Lotes, setLotes] = useState<ILote[]>([]);
    const [Plantas, setPlantas] = useState<IPlantas[]>([]);
    const [Proyectos, setProyectos] = useState<IProyecto[]>([]);
    const [Haciendas, setHaciendas] = useState<IHacienda[]>([]);
    const GetHaciendas = async (): Promise<ISelectListItem[]> => {
        try {
            const Response = await getRequest<IHacienda[]>(Endpoints.Hacienda);
            setHaciendas(Response);
            const Data: ISelectListItem[] = Response.map((data) => {
                return {
                    value: data.id.toString(),
                    label: data.codigo
                };
            });
            console.log(Data);
            return Data; // Devuelve el arreglo transformado
        } catch (error) {
            console.error('Error al obtener haciendas:', error);
            return [];
        }
    };
    const GetProyectos = async (): Promise<ISelectListItem[]> => {
        try {
            const Response = await getRequest<IProyecto[]>(Endpoints.Proyecto);
            setProyectos(Response);
            const Data: ISelectListItem[] = Response.map((data) => {
                return {
                    value: data.id.toString(),
                    label: data.Codigo_Proyecto
                };
            });
            return Data; // Devuelve el arreglo transformado
        } catch (error) {
            console.error('Error al obtener lotes:', error);
            return [];
        }
    };
    const GetLotes = async (): Promise<ISelectListItem[]> => {
        try {
            const Response = await getRequest<ILote[]>(Endpoints.lotes);

            // Actualiza el estado con los lotes si es necesario
            setLotes(Response);

            // Mapea los lotes a un arreglo de objetos ISelectListItem
            const Data: ISelectListItem[] = Response.map((data) => {
                return {
                    value: data.id.toString(),
                    label: data.Codigo_Lote
                };
            });

            return Data; // Devuelve el arreglo transformado
        } catch (error) {
            console.error('Error al obtener lotes:', error);
            // Manejar el error según tus necesidades, por ejemplo, puedes retornar un arreglo vacío
            return [];
        }
    };
    const GetPlantas = async (): Promise<ISelectListItem[]> => {
        try {
            const Response = await getRequest<IPlantas[]>(Endpoints.Plantas);
            setPlantas(Response);
            const Data: ISelectListItem[] = Response.map((data) => {
                return {
                    value: data.id.toString(),
                    label: data.Codigo_Planta
                };
            });
            return Data; // Devuelve el arreglo transformado
        } catch (error) {
            console.error('Error al obtener lotes:', error);
            // Manejar el error según tus necesidades, por ejemplo, puedes retornar un arreglo vacío
            return [];
        }
    };
    
    return {
        GetPlantas,
        GetLotes,
        GetProyectos,
        GetHaciendas,
        Plantas,
        Lotes,
        Proyectos
    };
};
