import React, { useEffect, useState, ChangeEvent } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { IAnalytics } from '../interfaces/AuthInterface';

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
  //call api
  const GetData = async () => {
    await getRequest<IAnalytics>(Endpoints.Analitics,{
      to:"2024-01-30",
      from: "2024-01-30",
    })
      .then((e) => {
        setData(e)
        console.log(e);
      })
      .catch((error) => console.warn(error));
  };
  useEffect(() => {

    // Realiza una solicitud a la API para obtener los datos
    GetData();

  }, []);
  return (
    <BaseLayout PageName='Estadisticas'>
      <div className='container'>
        <div className="row">
          <div className="col-md-12 text-center">
            {/*<h1>Pantalla en espera...<Spinner animation="border" variant='success' /></h1>*/}
          </div>
          <div className="col-md-6">
            <h5>Masorcas por estadio</h5>
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
            <LineChart width={600} height={300} data={data?.Trees} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="Plantas" stroke="#8884d8" />
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