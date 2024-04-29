import { Produccion } from '../views/Produccion';
import { Lecturas } from '../views/Lecturas';
export interface IAnalytics {
  Trees: IProyectoPlantas[];
  Lecturas: IProyectoLecturas[];
  Produccion: IProduccionProyecto[];
  Enfermedades: IProyectoEnfermedades[];
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
export interface IProyectoEnfermedades {
  Victoria: string;
  GR1: number;
  GR2: number;
  GR3: number;
  GR4: number;
  GR5: number;
  Cherelles: number;
}
export interface IProduccionProyecto {
  Victoria: string;
  qq: number;
}
export interface IHome {
  Date: string;
  Usuarios: number;
  Haciendas: IHaciendas[];

}
export interface IHaciendas {
  Hacienda: string;
  Lecturas: number;
  Proyects: IProyect[];
}
export interface IProyect {
  Proyect: string;
  Lecturas: number;
}
export interface ISync {
  data: IWeather[];
  analytics: IAnalyticWeather[];
}
export interface IWeather extends IAnalyticWeather {
  Date_Arable_Sync: string | null;
  Date_Sync: string;
  Lat: number | null;
  Lng: number | null;
  LocationID: number | null;
  Device: string;
  Temp_Below: number | null;
  Temp_Below_Mean: number | null;
  Dew_Temp_At_Min_Temp: number | null;
  Relat_Hum_Mean: number | null;
  Relat_Hum_Min: number | null;
  Relat_Hum_Max_Temp: number;
  Relat_Hum_Min_Temp: number;
  Dli: number | null;
  Vapor_Pressure: number | null;
  Activo: boolean;
  Usuario: string;
}
export interface IAnalyticWeather {
  Date: string;
  Evapotranspiration_Crop: number;
  Ndvi: number;
  Relat_Hum_Max_Temp: number;
  Temp_Air_Max: number;
  Temp_Air_Min: number;
  Dew_Temp_Max: number;
  Precipitacion: number;
  Sunshine_Duration: number;
}

