import React, { useEffect, useState } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { CustomTable } from '../components/CustomTable';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { IPlantas } from '../interfaces/AuthInterface';
const columns = [
    
    {
      dataField: 'Codigo_Planta',
      text: 'Código',
    },
    {
      dataField: 'Nombre',
      text: 'Nombre',
    },
    // Agrega más columnas según sea necesario
  ];
export const Plantas = ()=>{
  const { getRequest } = useRequest();
  const [data, setData] = useState<IPlantas[]>([]);

  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos
      getRequest<IPlantas[]>(Endpoints.Plantas)
      .then((e) => {
        setData(e)
        console.log(e);
      })
      .catch((error) => console.log(error));
  }, []);
return(
    <BaseLayout>
    <div className='container'>
    <h1>Plantas</h1>
    <CustomTable columns={columns} data={data}></CustomTable>
    </div>
    
    </BaseLayout>
)
}