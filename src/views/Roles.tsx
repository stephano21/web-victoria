import React, { useEffect, useState, ChangeEvent } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { CustomTable } from '../components/CustomTable';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { IPermissions, IRol, ISelectListItem, IUser } from '../interfaces/AuthInterface';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GenericForm } from '../components/Form';
import { useRolState } from '../states/PlantaState';
import Download from '../components/Download';
const columns = [
  {
    dataField: 'name',
    text: 'Rol',
  },
  {
    dataField: 'first_name',
    text: 'Permisos',
  }
];

export const Roles = () => {
  //const
  const { getRequest, postRequest } = useRequest();
  const { Rol, handleInputChange } = useRolState();
  const [data, setData] = useState<IRol[]>([]);
  const [permissionsdata, setPermissionsData] = useState<IPermissions[]>([]);

  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [RoleForm, setRoleForm] = useState<IRol>()
  //functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  const SaveRole = () => {
    postRequest(Endpoints.Roles, Rol!)
      .then((e) => {
        console.log(e, Rol);
        GetData()
      })
      .catch((error) => alert(error.response.data));
    console.log(JSON.stringify(Rol, null, 3))
  };
  //call api
  const GetData = async () => {
    await getRequest<IRol[]>(Endpoints.Roles)
      .then((e) => {
        setData(e)
        //console.log(e);
      })
      .catch((error) => console.warn(error));

    await getRequest<IPermissions[]>(Endpoints.Permissions)
      .then((e) => {
        setPermissionsData(e)
      })
      .catch((error) => console.warn(error));
  };
  useEffect(() => {

    // Realiza una solicitud a la API para obtener los datos
    GetData();

  }, []);

  const xdd: ISelectListItem[] = permissionsdata.map((data) => {
    return {
      value: data.id.toString(),
      label: data.codename
    }
  }
  )





  return (
    <BaseLayout PageName='Usuarios'>
      <div className='container'>
        <div className="row">
          <div className="col-sm-2">
            <Button variant="success">
              <i className="bi bi-plus-circle" onClick={handleShowCreate}></i>&nbsp;
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
        <Modal show={showCreate} onHide={handleCloseCreate}>
          <Modal.Header closeButton>
            <Modal.Title>Crear rol</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GenericForm
              showSubmit={false}
              fields={[
                {
                  name: "name",
                  label: "Nombre",
                  bclass: "form-control",
                  value: Rol?.name, // Establece el valor de password desde el estado formData

                  onChange: (value) => handleInputChange("name", value),
                },
                {
                  name: "permissions",
                  label: "Permisos",
                  bclass: "form-control",
                  placeholder: "Ingrese el código",
                  inputType: "select",
                  options: xdd,
                  multiple: true,
                  value: Rol?.permissions, // Establece el valor de password desde el estado formData
                  onChange: (event) => {
                    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
                    console.log(selectedValues);
                  }
                  
                }
              ]}
              onSubmit={() => { }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreate}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={SaveRole}>
              <i className="bi bi-rocket-takeoff"></i> Enviar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    </BaseLayout>
  )
}