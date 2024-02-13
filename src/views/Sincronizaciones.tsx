import React, {ChangeEvent, useEffect, useState} from "react"
import { BaseLayout } from "../components/BaseLayout"
import { useRequest } from "../api/UseRequest";
import { Endpoints } from "../api/routes";
import { DataTable } from "../components/DataTable";

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
    const [file, setFile] = useState<File | null>(null)
    useEffect(() => {
      // Realiza una solicitud a la API para obtener los datos
        getRequest<any>(Endpoints.WeatherData)
        .then((e) => {
          setData(e)
          console.log(e);
        })
        .catch((error) => console.log(error));
    }, []);
    const SetWeatherCSV = (e: ChangeEvent<HTMLInputElement>) => {
      console.log('archivo xd', e[0])
      const archivo = e[0]
      console.log('archivo xd', archivo)
      if (archivo) {
        setFile(archivo)
      }
    }
    return (
      <BaseLayout PageName="Clima">
        <div className='container'>
        <DataTable columnNames={columns} data={data}></DataTable>
        </div>
    
    </BaseLayout>
    )
}