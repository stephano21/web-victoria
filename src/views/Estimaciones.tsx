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
import { Timeline, Grid, Row, Col } from 'rsuite';
import CheckIcon from '@rsuite/icons/legacy/Check';

const renderTimelineItems = (monthData) => {
  return Object.entries(monthData).map(([month, items]) => (
    <Timeline.Item key={month} dot={<CheckIcon style={{ background: '#15b215', color: '#fff' }} />}>
      <p>{month}</p>
      {items.map((item, index) => (
        <>
        <h4> {`victoria ${index + 1}`}</h4>
        <p key={index}>{`Quintales: ${item["victoria" + (index + 1)]}`}</p>
        <p key={index}>{`Q/Has: ${item["q/l"]}`}</p>
        </>
      ))}
    </Timeline.Item>
  ));
};


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
  const data = [
    {
      'Febrero': [
        {
          "victoria1": 248.693746,
          "q/l": 44.377480,
        },
        {
          "victoria2": 204.976898,
          "q/l": 25.727575,
        }, 
        {
          "victoria3": 199.689498,
          "q/l": 29.158436,
        },
        {
          "victoria4": 92.386954,
          "q/l": 19.004831,
        }
      ],
      'Marzo': [
        {
          "victoria1": 54.849177,
          "q/l": 9.545397,
        },
        {
          "victoria2": 164.277929,
          "q/l": 21.159834,
        }, 
        {
          "victoria3": 102.855013,
          "q/l": 15.088717,
        },
        {
          "victoria4": 95.7233976,
          "q/l": 21.724409,
        }
      ],
      'Abril':[
        {
          "victoria1": 201.121069,
          "q/l":33.004932,
        },
        {
          "victoria2": 268.154571,
          "q/l":34.531651,
        }, 
        {
          "victoria3":232.560612,
          "q/l": 34.1638950,
        },
        {
          "victoria4":  130.474347,
          "q/l": 28.5328640,
        }
      ],
      'Mayo': [
        {
          "victoria1": 32.587902,
          "q/l": 5.637151,
        },
        {
          "victoria2": 43.732002,
          "q/l": 5.353327,
        }, 
        {
          "victoria3": 55.177322,
          "q/l": 7.988513,
        },
        {
          "victoria4": 23.402240,
          "q/l": 4.726527,
        }
      ],
      'Junio': [
        {
          "victoria1": 248.693746,
          "q/l": 12.574623,
        },
        {
          "victoria2": 248.693746,
          "q/l": 13.017844,
        }, 
        {
          "victoria3": 248.693746,
          "q/l": 15.084069,
        },
        {
          "victoria4": 248.693746,
          "q/l": 9.683834,
        }
      ],
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
        <Grid fluid>
      <Row>
        <Col xs={8}>
          <Timeline align="left" className="custom-timeline">
            {renderTimelineItems(data[0])}
          </Timeline>
        </Col>
        
      </Row>
    </Grid>
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
