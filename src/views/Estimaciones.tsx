import React, { useEffect, useState } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { Card, Modal, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Timeline, Grid, Row, Col } from 'rsuite';
import CheckIcon from '@rsuite/icons/legacy/Check';
import { IDatosPorMes, IPredict } from '../interfaces/PredictInterface';
import { useAuth } from '../context/AuthContext';
import { id } from 'date-fns/locale';

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
  const { UserData } = useAuth();
  const handleClose = () => {
    setData([{
      mes: "",
      data: [{
        Project: 0,
        Pred: 0,
        "qq/has": 0,
      }]
    }])
    setShow(false)
  };
  const handleShow = (Id: string) => {
    GetSampleData(Id)
    setShow(true)
  };
  const { getRequest } = useRequest();
  const [data, setData] = useState<IDatosPorMes[]>(
    [{
      mes: "",
      data: [{
        Project: 0,
        Pred: 0,
        "qq/has": 0,
      }]
    }]
  );
  const renderCardItems = (monthData: IPredict[]) => {
    return monthData.map(({ Id, FechaRegistro, Hacienda }) => (
      <Card key={Id} style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{Hacienda}</Card.Title>
          <Card.Text>
            {`Fecha de registro: ${FechaRegistro}`}
          </Card.Text>
          <Button variant="primary" onClick={() => handleShow(Id)}> <i className="bi bi-eye-fill"></i> Ver Estimaciones</Button>
        </Card.Body>
      </Card>
    ));

  }
  const [predictions, setPredictions] = useState<IPredict[]>([])
  const GetData = async () => {
    const response = await getRequest<IPredict[]>(Endpoints.Predict);
    console.log(response);
    setPredictions(response);
  }
  const GetSampleData = async (Id: string) => {
    const response = await getRequest<IDatosPorMes[]>(Endpoints.Predict + Id + "/");
    console.log(JSON.stringify(response, null, 3));
    setData(response);
  }
  const HandeleButton = () => getRequest(Endpoints.PredictSync);
  useEffect(() => {
    GetData();
  }, [])
  return (
    <BaseLayout PageName='Estimaciones'>
      <div className="container">
        {UserData && UserData?.rol !== null && UserData.rol === "Root" && (
          <button type="button" className="btn btn-success" onClick={HandeleButton}><i className='bi bi-arrow-repeat'></i>Sync </button>
        )}

      </div>
      <div className='container d-flex align-items-center justify-content-center'>
        <div className="row mt-5 m-2">
            {renderCardItems(predictions)}
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
