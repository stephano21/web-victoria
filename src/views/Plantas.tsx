import React, { ChangeEvent, useEffect, useState } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { CustomTable } from '../components/CustomTable';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { IPlantas, ISelectListItem } from '../interfaces/AuthInterface';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GenericForm } from '../components/Form';
import { DataTable } from '../components/DataTable';
import { Selects } from '../hooks/useSelect';
import useCrud from '../hooks/useCrud';
import { Input } from '../components/InputCustom';
import { Download } from '../components/Download';
const columns = [

  {
    dataField: 'Codigo_Planta',
    text: 'Código',
  },
  {
    dataField: 'Nombre',
    text: 'Nombre',
  },
];
export const Plantas = () => {
  const { getRequest, postFileRequest } = useRequest();
  const { GetLotes } = Selects();

  const [LotesSelect, setLotesSelect] = useState<ISelectListItem[]>([]);
  const [file, setFile] = useState<File | null>(null)
  const [Planta, setPLanta] = useState<IPlantas>({
    id: 0,
    Nombre: "",
    Codigo_Planta: "",
    Id_Lote: 0,
    Disabled: false,
    Activo: true,
    lat: 0,
    lng: 0,

  });
  const {
    data,
    createItem,
  } = useCrud<IPlantas>(Endpoints.Plantas);
  const [show, setShow] = useState(false);
  const [showImport, setshowImport] = useState(false);
  const ResetForm = () => {
    setPLanta({
      id: 0,
      Nombre: "",
      Codigo_Planta: "",
      Id_Lote: 0,
      Disabled: false,
      Activo: true,
      lat: 0,
      lng: 0,
    })
  }
  const handleClose = () => {
    setShow(false);
    ResetForm();
  };
  const handleShow = () => setShow(true);
  const handleCloseImport = () => setshowImport(false);
  const handleShowImport = () => setshowImport(true);
  const handleInputChange = (name: string, value: string) => {
    setPLanta({
      ...Planta,
      [name]: value,
    });
  };
  const HandleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const archivo = e[0]
    if (archivo) {
      setFile(archivo)
    }
  }
  const ImporPlantas = () => {
    const formData = new FormData()
    formData.append('plantas', file as any)

    postFileRequest(Endpoints.Plantas + Endpoints.Upload, formData)
      .then((e) => {
        console.log(e, formData);
      })
      .catch((error) => console.log(error.response.data));
    console.log(JSON.stringify(formData, null, 3))
  };
  const SavePlanta = () => {
    createItem(Planta)
  };
  //call api
  const GetData = async () => {
    setLotesSelect(await GetLotes())
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    <BaseLayout PageName='Plantas'>
      <div className='container'>
        <Button variant="success" onClick={handleShow}>
          <i className="bi bi-plus-circle"></i>&nbsp; Crear
        </Button>
        <Button variant="primary" onClick={handleShowImport}>
          <i className="bi bi-upload"></i>&nbsp;  Cargar
        </Button>

        <DataTable columnNames={columns} data={data}></DataTable>
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
                  placeholder: "Escriba el nombre de la planta",
                  value: Planta.Nombre, // Establece el valor de username desde el estado formData
                  onChange: (value) => handleInputChange("Nombre", value), // Maneja los cambios en el username
                },
                {
                  name: "Codigo_Planta",
                  label: "Código",
                  bclass: "form-control",
                  placeholder: "Ingrese el código",
                  value: Planta.Codigo_Planta, // Establece el valor de password desde el estado formData
                  onChange: (value) => handleInputChange("Codigo_Planta", value), // Maneja los cambios en el password
                },
                {
                  name: "lat",
                  inputType: "number",
                  label: "Latitud",
                  bclass: "form-control",
                  placeholder: "Ingrese la latitud",
                  value: Planta.lat, // Establece el valor de password desde el estado formData
                  onChange: (value) => handleInputChange("lat", value), // Maneja los cambios en el password
                },
                {
                  name: "lng",
                  inputType: "number",
                  label: "Longitud",
                  bclass: "form-control",
                  placeholder: "Ingrese la longitud",
                  value: Planta.lng, // Establece el valor de password desde el estado formData
                  onChange: (value) => handleInputChange("lng", value), // Maneja los cambios en el password
                },
                {
                  name: "Id_Lote",
                  label: "Lote",
                  bclass: "form-control",
                  placeholder: "Ingrese el código",
                  inputType: "select",
                  options: LotesSelect,
                  value: Planta.Id_Lote, // Establece el valor de password desde el estado formData
                  onChange: (value) => handleInputChange("Id_Lote", value.value), // Maneja los cambios en el password
                }
              ]}
              onSubmit={SavePlanta}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={SavePlanta}>
              Enviar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showImport} onHide={handleCloseImport}>
          <Modal.Header closeButton>
            <Modal.Title>Cargar Plantas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GenericForm
              showSubmit={false}
              fields={[
                {
                  name: "Id_Lote",
                  label: "Lote",
                  bclass: "form-control",
                  placeholder: "Ingrese el código",
                  inputType: "file",
                  value: Planta.Id_Lote, // Establece el valor de password desde el estado formData
                  onChange: (value) => {
                    HandleFile(value)
                  }, // Maneja los cambios en el password
                }
              ]}
            />
          </Modal.Body>
          <Modal.Footer>
            <Download fileName="FormatoPlantas.xlsx" Name='Formato de Lecturas' />
            <Button variant="secondary" onClick={handleCloseImport}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={ImporPlantas}>
              Enviar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    </BaseLayout>
  )
}