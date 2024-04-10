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
import { IDatosPorMes } from '../interfaces/PredictInterface';

const renderTimelineItems = (monthData: IDatosPorMes[]) => {
  return monthData.map(({ mes, data }) => (
    <Timeline.Item key={mes} dot={<CheckIcon style={{ background: '#15b215', color: '#fff' }} />}>
      <p>{mes}</p>
      {data.map(({ Project, Pred, "qq/has": qqHas }, index) => (
        <React.Fragment key={index}>
          <h4>{Project}</h4>
          <p>{`Quintales: ${Pred}`}</p>
          <p>{`Qq/Has: ${qqHas}`}</p>
        </React.Fragment>
      ))}
    </Timeline.Item>
  ));
};


export const Estimaciones = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { getRequest } = useRequest();
  const [data, setData] = useState<IDatosPorMes[]>(
    [{
      mes: "",
      data: [{
        project: 0,
        Pred: 0,
        "qq/has": 0,
      }]
    }]
  );
  const GetData = async () => {
    const response = await getRequest<IDatosPorMes>(Endpoints.Predict);
    console.log(JSON.stringify(response, null, 3));
    setData(response);
  }
  useEffect(() => {
    GetData();
  }, [])
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
                {data.length > 0 ? (
                  <Timeline align="left" className="custom-timeline">
                    {renderTimelineItems(data)}
                  </Timeline>

                ) : (
                  <Spinner animation="border" variant='success' />
                )}
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
