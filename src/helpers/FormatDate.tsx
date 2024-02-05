import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
export const DateToString = (fechaString) => {
    const fecha = parseISO(fechaString); // Convierte la cadena de fecha a un objeto de fecha
    // Utiliza la función `format` para formatear la fecha
    const fechaFormateada = format(fecha, "d 'de' MMMM 'de' yyyy", { locale: es });
    return fechaFormateada;
  };