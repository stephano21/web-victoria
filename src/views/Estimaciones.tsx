import React, { useEffect, useState, ChangeEvent } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { CustomTable } from '../components/CustomTable';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { IPlantas } from '../interfaces/AuthInterface';
import { Card, Modal, Spinner, Toast } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GenericForm } from '../components/Form';
import { usePlantaState } from '../states/PlantaState';
import { DataTable } from '../components/DataTable';



export const Estimaciones = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const columns = [
    
    {
      dataField: 'Febrero',
      text: 'Febrero',
    },
    {
      dataField: 'Marzo',
      text: 'Marzo',
    },
    {
      dataField: 'Abril',
      text: 'Abril',
    },
    {
      dataField: 'Mayo',
      text: 'Mayo',
    },
    {
      dataField: 'Junio',
      text: 'Junio',
    }
  ];
  const data =[
    {
      'Febrero':171.5,
      'Marzo':182.21,
      'Abril':197.24,
      'Mayo':201.15,
      'Junio':231.44,
    }
  ];
  return (
    <BaseLayout PageName='Estimaciones'>
      <div className='container d-flex align-items-center justify-content-center'>
        <div className="row">
          <div className="col-md-12 text-center">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Ultima producción</Card.Title>
                <Card.Text>
                  Se produjeron 185.54 qq
                </Card.Text>
                <Button variant="primary" onClick={handleShow}>Estimaciones</Button>
              </Card.Body>
            </Card>

          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} aria-labelledby="example-modal-sizes-title-lg" size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Valores estimados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <DataTable columnNames={columns} data={data}></DataTable>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
         
        </Modal.Footer>
      </Modal>
    </BaseLayout>
  )
}