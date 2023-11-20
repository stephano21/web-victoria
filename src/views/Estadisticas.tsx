import React, { useEffect, useState, ChangeEvent  } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { CustomTable } from '../components/CustomTable';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { IPlantas } from '../interfaces/AuthInterface';
import { Modal, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GenericForm } from '../components/Form';
import { usePlantaState } from '../states/PlantaState';



export const Estadisticas = () => {
  return (
    <BaseLayout PageName='Estadisticas'>
      <div className='container'>
      <div className="row">
          <div className="col-md-12 text-center">
            <h1>Pantalla en espera...<Spinner animation="border" variant='success' /></h1>
          </div>
        </div>
      </div>

    </BaseLayout>
  )
}