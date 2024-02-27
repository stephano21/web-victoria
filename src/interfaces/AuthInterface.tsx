export interface AuthInterface {
  username: string;
  password: string;
}
export interface TokenResponse {
  user: string;
  rol: string;
  access_token: string;
  refresh_token: string;
}

//ApirError
export interface ApiErrorResponse {
  Message: string;
  error_description: string;
}
export interface IProyecto {
  id?: number;
  Codigo_Proyecto: string;
  Nombre: string;
  Densidad?: number | null;
  Activo?: boolean;
  Usuario?: string;
  Id_Hacienda: number;
}
export interface IPlantas {
  id: number;
  Disabled: boolean;
  Codigo_Planta: string;
  Nombre: string;
  Activo: boolean;
  Id_Lote: number;
  lat: number;
  lng: number;
}
export interface ILote {
  id: number;
  Codigo_Lote: string;
  Nombre: string;
  Hectareas: number | null;
  Variedad: string;
  Id_Proyecto: number;
  Activo: boolean;
  FechaSiembra?: Date;
  Edad?: number;
  Num_Plantas?: number;
}
export interface IRegister {
  cedula: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  Id_Hacienda: number;
}
export interface IUser {
  id: number;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  groups?: number[];
  user_permissions?: any[];
  cedula: string;
  user: number;
}
export interface IRol {
  id?: number;
  name: string,
  permissions?: IPermissions[]
}

export interface IPermissions {
  id: number;
  name: string;
  codename: string;
  content_type: number;
}

export interface ILectura {
  id: number | null;
  E1: number | null;
  E2: number | null;
  E3: number | null;
  E4: number | null;
  E5: number | null;
  GR1: number | null;
  GR2: number | null;
  GR3: number | null;
  GR4: number | null;
  GR5: number | null;
  Cherelles: null | number;
  Observacion: string;
  FechaVisita: Date;
  Activo: boolean;
  Id_Planta: number;
}

export interface IProduccion {
  id?: number;
  Lote?: string;
  Fecha_Produccion?: string;
  Qq: number;
  Fecha?: string;
  FechaRegistro?: string;
  Activo?: boolean;
  Usuario?: string;
  Id_Lote?: number;
}

export interface ISelectListItem {
  value: string,
  label: string,
}
