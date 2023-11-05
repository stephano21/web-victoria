export const Endpoints = {
  //BaseURL: "https://victoria-api.up.railway.app",
  BaseURL: process.env.NODE_ENV === 'production' ? 'https://victoria-api.up.railway.app' : 'http://127.0.0.1:8000',
  //BaseURL:'https://conautec.conauto.com.ec:444',
  Api: "/api",
  login: "/auth/login/",
  //login: '/cuentas/login/',

  register: "/auth/register/",
  lotes: "/lotes/",
  Token: "/auth/refresh/",
  Poligonos: "/geolotes/",
  perfil: "/auth/porfile/",
  Lectura: "/lecturas/",
  Plantas: "/plantas/",
  WeatherData: "/weather/data/"
};
