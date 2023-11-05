import React, {useEffect, useState} from "react"
import { BaseLayout } from "../components/BaseLayout"
import { CustomTable } from "../components/CustomTable"
import { useRequest } from "../api/UseRequest";
import { Endpoints } from "../api/routes";

const columns = [
    
    {
      dataField: 'Device',
      text: 'Código',
    },
    {
      dataField: 'Date',
      text: 'Nombre',
    },
    {
        dataField:'LocationID',
        text:"Ubicacion ID",
    },
    {
        dataField:'Temp_Air_Mean',
        text:"Ubicacion ID",
    }
    // Agrega más columnas según sea necesario
  ];
export const Sincronizaciones = () => {
    const { getRequest } = useRequest();
    const [data, setData] = useState([]);
  
    useEffect(() => {
      // Realiza una solicitud a la API para obtener los datos
        getRequest<any>(Endpoints.WeatherData)
        .then((e) => {
          setData(e)
          console.log(e);
        })
        .catch((error) => console.log(error));
    }, []);
    return (
        <BaseLayout>
    <div className='container'>
    <h1>Clima</h1>
    <CustomTable columns={columns} data={data}></CustomTable>
    </div>
    
    </BaseLayout>
    )
}