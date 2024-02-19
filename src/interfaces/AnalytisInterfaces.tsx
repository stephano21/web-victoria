import { Produccion } from '../views/Produccion';
import { Lecturas } from '../views/Lecturas';
export interface IAnalytics {
    Trees: IProyectoPlantas[];
    Lecturas: IProyectoLecturas[];
    Produccion: IProduccionProyecto[];
  }
  export interface IProyectoPlantas {
    Victoria: string;
    Plantas: number;
  }
  export interface IProyectoLecturas {
    Victoria: string;
    E1: number;
    E2: number;
    E3: number;
    E4: number;
    E5: number;
  }
  export interface IProduccionProyecto {
    Victoria: string;
    qq: number;
  }
  export interface IHome{
    Usuarios:number;
    Lecturas:number;
    Proyects:IProyect[];
  }
  export interface IProyect{
    Proyect: string;
    Lecturas: number;
  }