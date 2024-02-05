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



export const Estimaciones = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <BaseLayout PageName='Estimaciones'>
      <div className='container d-flex align-items-center justify-content-center'>
        <div className="row">
          <div className="col-md-12 text-center">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Ultima producción</Card.Title>
                <Card.Text>
                  Se produjeron 385.54 qq
                </Card.Text>
                <Button variant="primary" onClick={handleShow}>Estimaciones</Button>
              </Card.Body>
            </Card>

          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Febrero</Modal.Title>
        </Modal.Header>
        <Modal.Body>Se espera producir 405.5 qq</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </BaseLayout>
  )
}