export interface AuthInterface {
  username: string;
  password: string;
}
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

//ApirError
export interface ApiErrorResponse {
  Message: string;
  error_description: string;
}
export interface IPlantas {
  id: number;
  Disabled: boolean;
  Codigo_Planta: string;
  Nombre: string;
  Activo: boolean;
  Id_Lote: number;
}
export interface ILote {
  id: number;
  Codigo_Lote: string;
  Nombre: string;
  Hectareas: number | null;
  Variedad: null;
  Id_Proyecto: number;
  Activo: boolean;
}
export interface IUser {
  id:               number;
  is_superuser:     boolean;
  username:         string;
  first_name:       string;
  last_name:        string;
  email:            string;
  is_staff:         boolean;
  is_active:        boolean;
  groups:           number[];
  user_permissions: any[];
  cedula:           string;
  user:             number;
}
