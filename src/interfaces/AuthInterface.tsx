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
