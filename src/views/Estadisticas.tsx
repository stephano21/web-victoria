import React, { useEffect, useState, ChangeEvent } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { IAnalytics } from '../interfaces/AnalytisInterfaces';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Tooltip,
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,

} from 'recharts';
import { Input } from '../components/InputCustom';
import { IDateFilter } from '../interfaces/FilterInteface';
//const data = [{ name: 'Ene', price: 0 }, { name: 'Feb', price: 501}, { name: 'Page B', price: 681}];
const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};
export const Estadisticas = () => {
  const { getRequest, postRequest } = useRequest();
  const [data, setData] = useState<IAnalytics>();
  const [DateFilter, setDateFilter] = useState<IDateFilter>({
    to: "",
    from: "",
  });
  //call api
  const GetData = async () => {
    await getRequest<IAnalytics>(Endpoints.Analitics, DateFilter)
      .then((e) => {
        setData(e)
        console.log(e);
      })
      .catch((error) => console.warn(error));
  };
  useEffect(() => {

    // Realiza una solicitud a la API para obtener los datos
    GetData();

  }, [DateFilter]);
  const handleFilterChange = (name: string, value: string) => {
    // Convierte las fechas a objetos Date para comparación
    const fromDate = new Date(DateFilter.from);
    const toDate = new Date(DateFilter.to);
    const selectedDate = new Date(value);
  
    // Realiza la validación según tu lógica específica
    if (name === "from" && toDate.getTime() < selectedDate.getTime()) {
      // La fecha de inicio no puede ser después de la fecha de fin
      console.log("Fecha de inicio no puede ser después de la fecha de fin");
      return;
    }
  
    if (name === "to" && fromDate.getTime() > selectedDate.getTime()) {
      // La fecha de fin no puede ser antes de la fecha de inicio
      console.log("Fecha de fin no puede ser antes de la fecha de inicio");
      return;
    }
  
    // Si la validación pasa, actualiza el estado DateFilter
    setDateFilter({
      ...DateFilter,
      [name]: value,
    });
  };
  
  return (
    <BaseLayout PageName='Estadisticas'>
      <div className='container'>
        <div className='d-flex flex-row-reverse'>
          <div className="p-2">
            <Input type='date'
              label='Fecha Hasta'
              bclass='form-control'
              value={DateFilter.to}
              onChange={(value) => handleFilterChange("to", value.toString())}
            ></Input>
          </div>
          <div className="p-2">
            <Input type='date' 
            label='Fecha Desde' 
            bclass='form-control' 
            value={DateFilter.from}
            onChange={(value) => handleFilterChange("from", value.toString())}></Input>
          </div>
        </div>
        <div className="row text-center">
          <h5>{DateFilter.from!=='' && DateFilter.to? 
          `Mostrando registros desde ${DateFilter.from} hasta ${DateFilter.to}`:
          DateFilter.from!==''?`Mostrando datos desde ${DateFilter.from}`:
          DateFilter.to!==''?`Mostrando datos hasta ${DateFilter.to}`:'Mostrando todos los datos'}</h5>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            {/*<h1>Pantalla en espera...<Spinner animation="border" variant='success' /></h1>*/}
          </div>
          <div className="col-md-6">
            <h5>Masorcas promedio por estadio</h5>
            <LineChart width={600} height={300} data={data?.Lecturas}>
              <Line type="monotone" dataKey="E1" stroke="#49942D" />
              <Line type="monotone" dataKey="E2" stroke="#64942D" />
              <Line type="monotone" dataKey="E3" stroke="#BCBA35" />
              <Line type="monotone" dataKey="E4" stroke="#F18E16" />
              <Line type="monotone" dataKey="E5" stroke="#F15516" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="Victoria" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
          <div className="col-md-6">
            <h5>Plantas por Victoria</h5>
            <BarChart width={600} height={300} data={data?.Trees}>
              <XAxis dataKey="Victoria" />
              <YAxis />
              <Bar dataKey="Plantas" barSize={30} fill="#8884d8" />
              <Tooltip />
            </BarChart>
          </div>

          <div className="col-md-6">
            <h5>Producción por victoria en Quintales </h5>
            <LineChart width={600} height={300} data={data?.Produccion} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="qq" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="Victoria" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </div>
          <div className="col-md-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data?.Trees}>
                <RadialBar
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  dataKey="Plantas"
                />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
              </RadialBarChart>
            </ResponsiveContainer>

          </div>
        </div>
      </div>

    </BaseLayout>
  )
}