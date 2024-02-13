import React, { ChangeEvent, useEffect, useState } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { ILectura } from '../interfaces/AuthInterface';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GenericForm } from '../components/Form';
import {Download} from '../components/Download';
import { DataTable } from '../components/DataTable';
const columns = [
  {
    dataField: 'FechaVisita',
    text: 'Fecha',
  },
  {
    dataField: 'E1',
    text: 'E1',
  },
  {
    dataField: 'E2',
    text: 'E2',
  },
  {
    dataField: 'E3',
    text: 'E3',
  },
  {
    dataField: 'E4',
    text: 'E4',
  },
  {
    dataField: 'E5',
    text: 'E5',
  },
  {
    dataField: 'GR1',
    text: 'GR1',
  },
  {
    dataField: 'GR2',
    text: 'GR2',
  },
  {
    dataField: 'GR3',
    text: 'GR3',
  },
  {
    dataField: 'GR4',
    text: 'GR4',
  },
  {
    dataField: 'GR5',
    text: 'GR5',
  },
  {
    dataField: 'Cherelles',
    text: 'Cherelles',
  },
  {
    dataField: 'Observacion',
    text: 'Observacion',
  },
  // Agrega más columnas según sea necesario
];

export const Lecturas = () => {
  const { getRequest, postFileRequest } = useRequest();
  const [data, setData] = useState<ILectura[]>([]);
  const [Lectura, setLectura] = useState({
    Nombre: "",
    Codigo: "",
    Id_Lote_id: 0,
  });
  const [file, setFile] = useState<File | null>(null)
  const [show, setShow] = useState(false);
  //functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const ImporLecturas = () => {
    const formData = new FormData()
    formData.append('lecturas', file as any)

    postFileRequest(Endpoints.Lectura+Endpoints.Upload, formData)
      .then((e) => {
        console.log(e, formData);
      })
      .catch((error) => console.log(error.response.data));
    console.log(JSON.stringify(formData, null, 3))
  };
  const SetearFile = (e: ChangeEvent<HTMLInputElement>) => {
    const archivo = e[0]
    if (archivo) {
      setFile(archivo)
    }
  }
  //call api
  const GetData = async () => {
    await getRequest<ILectura[]>(Endpoints.Lectura)
      .then((e) => {
        setData(e)
      })
      .catch((error) => alert(error));
  };
  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos
    GetData();
  }, []);
  return (
    <BaseLayout PageName='Lecturas'>
      <div className='container'>
        <Button variant="primary" onClick={handleShow}>
          <i className="bi bi-upload"></i>&nbsp;  Cargar
        </Button>

       {/*  <CustomTable columns={columns} data={data}></CustomTable> */}
        <DataTable data={data} columnNames={columns} actionsColumn={<button/>}></DataTable>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Importar Lecturas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GenericForm
              showSubmit={false}
              fields={[
                {
                  name: "Lecturas",
                  label: "Cargar Archivo",
                  bclass: "form-control",
                  inputType: "file",
                  value: Lectura.Id_Lote_id, // Establece el valor de password desde el estado formData
                  onChange: (value) => {

                    SetearFile(value)
                    console.log(value)
                  },
                }
              ]}
              onSubmit={ImporLecturas}
            />
          </Modal.Body>
          <Modal.Footer>
          <Download fileName="FormatoLecturas.xlsx" Name='Formato de Lecturas'/>

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={ImporLecturas}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    </BaseLayout>
  )
}