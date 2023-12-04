import React, { useEffect, useState, ChangeEvent } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { CustomTable } from '../components/CustomTable';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { IPlantas } from '../interfaces/AuthInterface';
import { Modal, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GenericForm } from '../components/Form';
import { usePlantaState } from '../states/PlantaState';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar } from 'recharts';
const data = [{ name: 'Ene', uv: 0, pv: 1, amt: 1 }, { name: 'Feb', uv: 501, pv: 3500, amt: 950 }, { name: 'Page B', uv: 681, pv: 3500, amt: 950 }];

export const Estadisticas = () => {
  return (
    <BaseLayout PageName='Estadisticas'>
      <div className='container'>
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Pantalla en espera...<Spinner animation="border" variant='success' /></h1>
            <LineChart width={600} height={300} data={data}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
            <BarChart width={600} height={300} data={data}>
              <XAxis dataKey="name"/>
              <YAxis />
              <Bar dataKey="uv" barSize={30} fill="#8884d8"/>
            </BarChart>
          </div>
        </div>
      </div>

    </BaseLayout>
  )
}