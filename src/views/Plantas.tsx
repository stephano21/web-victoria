import React, { useContext, useEffect, useState } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { CustomTable } from '../components/CustomTable';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { IPlantas } from '../interfaces/AuthInterface';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GenericForm } from '../components/Form';
//import { AlertContext, AlertType } from '../context/AlertContext';
const columns = [

  {
    dataField: 'Codigo_Planta',
    text: 'Código',
  },
  {
    dataField: 'Nombre',
    text: 'Nombre',
  },
  // Agrega más columnas según sea necesario
];
const options = [
  /* { value: "option1", label: "Opción 1" },
  { value: "option2", label: "Opción 2" },
  { value: "option3", label: "Opción 3" },
  { value: "option4", label: "Opción 4" },
  { value: "option5", label: "Opción 5" }, */
];

export const Plantas = () => {
  //const
  const { getRequest } = useRequest();
  const [data, setData] = useState<IPlantas[]>([]);
  const [Planta, setPLanta] = useState({
    Nombre: "",
    Codigo: "",
    Id_Lote_id: 0,
  });
  const [show, setShow] = useState(false);
  //const {  addAlert } = useContext(AlertContext);
  //functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleInputChange = (name: string, value: string) => {
    setPLanta({
      ...Planta,
      [name]: value,
    });
  };
  const SavePlanta = () => {
    // Realiza alguna lógica de autenticación aquí
    //onLogin(formData.username, formData.password);
    alert(JSON.stringify( Planta,null,3))
  };
  //call api
  const GetData = async () => {
    await getRequest<IPlantas[]>(Endpoints.Plantas)
      .then((e) => {
        setData(e)
        console.log(e);
      })
      .catch((error) => alert(error));
  };
  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos
    GetData();
  }, []);
  return (
    <BaseLayout PageName='Plantas'>
      <div className='container'>
        <Button variant="success" onClick={handleShow}>
          <i className="bi bi-plus-circle"></i>&nbsp; Crear
        </Button>
        <Button variant="primary" onClick={handleShow}>
          <i className="bi bi-upload"></i>&nbsp;  Cargar
        </Button>
       
        <CustomTable columns={columns} data={data}></CustomTable>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Registar Planta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GenericForm
              showSubmit={false}
              fields={[
                {
                  name: "Nombre",
                  label: "Nombre",
                  bclass: "form-control",
                  placeholder: "Escriba el nombre del lote",
                  value: Planta.Nombre, // Establece el valor de username desde el estado formData
                  onChange: (value) => handleInputChange("Nombre", value), // Maneja los cambios en el username
                },
                {
                  name: "Codigo",
                  label: "Código",
                  bclass: "form-control",
                  placeholder: "Ingrese el código",
                  value: Planta.Codigo, // Establece el valor de password desde el estado formData
                  onChange: (value) => handleInputChange("Codigo", value), // Maneja los cambios en el password
                },
                {
                  name: "Id_Lote_id",
                  label: "Lote",
                  bclass: "form-control",
                  placeholder: "Ingrese el código",
                  inputType:"select",
                  options:options,
                  value: Planta.Id_Lote_id, // Establece el valor de password desde el estado formData
                  onChange: (value) => handleInputChange("Id_Lote_id", value), // Maneja los cambios en el password
                },
                {
                  name: "Id_Lote_id",
                  label: "Lote",
                  bclass: "form-control",
                  placeholder: "Ingrese el código",
                  inputType:"file",
                  options:options,
                  value: Planta.Id_Lote_id, // Establece el valor de password desde el estado formData
                  onChange: (value) => handleInputChange("Id_Lote_id", value), // Maneja los cambios en el password
                }
              ]}
              onSubmit={SavePlanta}
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