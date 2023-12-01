import React, { useEffect, useState, ChangeEvent } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { CustomTable } from '../components/CustomTable';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { IUser } from '../interfaces/AuthInterface';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GenericForm } from '../components/Form';
import { usePlantaState } from '../states/PlantaState';
const columns = [
  {
    dataField: 'cedula',
    text: 'Cédula',
    headerStyle: { backgroundColor: '#B7E47A' },
  },
  {
    dataField: 'first_name',
    text: 'Nombre',
  },
  {
    dataField: 'last_name',
    text: 'Aplellido',
  },
  {
    dataField: 'email',
    text: 'Correo',
  },
  {
    dataField: 'cedula',
    text: 'Cédula',
  },
  {
    dataField: 'username',
    text: 'Usuario',
  },
  {
    dataField: 'is_active',
    text: 'Estado',
  },
  {
    dataField: 'acciones',
    text: 'Acciones',
    style: { textAlign: 'center', magin: 5 },
    formatter: (cell, row) => (
      <div>
        <button className="btn btn-sm btn-primary"><i className="bi bi-pencil-square"></i></button>
        <button className="btn btn-sm btn-danger"><i className="bi bi-trash"></i></button>
      </div>
    ),
  },
];


export const Usuarios = () => {
  //const
  const { getRequest, postFileRequest } = useRequest();
  const { Planta, } = usePlantaState();
  const [data, setData] = useState<IUser[]>([]);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState<File | null>(null)
  //functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const SavePlanta = () => {
    const formData = new FormData()
    formData.append('usuarios', file as any)

    postFileRequest(Endpoints.ImportUsers, formData)
      .then((e) => {
        console.log(e, formData);
      })
      .catch((error) => alert(error.response.data));
    console.log(JSON.stringify(formData, null, 3))
  };
  //call api
  const GetData = async () => {
    await getRequest<IUser[]>(Endpoints.Users)
      .then((e) => {
        setData(e)
        //console.log(e);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos
    GetData();
  }, []);

  const SetearFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('archivo xd', e[0])
    const archivo = e[0]
    console.log('archivo xd', archivo)
    if (archivo) {
      setFile(archivo)
    }
  }

  return (
    <BaseLayout PageName='Usuarios'>
      <div className='container'>
        <div className="row">
          <div className="col-sm-2">
            <Button variant="success">
              <i className="bi bi-plus-circle"></i>&nbsp;
            </Button>
            <Button variant="primary" onClick={handleShow}>
              <i className="bi bi-upload"></i>&nbsp;
            </Button>
          </div>
          <div className="col-sm-2">
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-12">
            <CustomTable columns={columns} data={data}></CustomTable>

          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cargar usuarios</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GenericForm
              showSubmit={false}
              fields={[
                {
                  name: "usuarios",
                  label: "Archivo",
                  bclass: "form-control",
                  inputType: "file",
                  value: Planta.usuarios, // Establece el valor de password desde el estado formData
                  onChange: (value) => {
                    //handleInputChange("usuarios", value)
                    SetearFile(value)
                    console.log(value)
                  }, // Maneja los cambios en el password
                }
              ]}
              onSubmit={() => { }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={SavePlanta}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    </BaseLayout>
  )
}