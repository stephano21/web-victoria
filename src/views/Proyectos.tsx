import React, { ChangeEvent, useEffect, useState } from 'react';
import MapContainer from '../components/Map'; // Asegúrate de importar el componente MapContainer desde el lugar correcto
import { BaseLayout } from '../components/BaseLayout';
import { Button, Modal } from 'react-bootstrap';
import { Endpoints } from '../api/routes';
import { IProyecto, ISelectListItem } from '../interfaces/AuthInterface';
import { useRequest } from '../api/UseRequest';
import { DataTable } from '../components/DataTable';
import { Selects } from '../hooks/useSelect';
import useCrud from '../hooks/useCrud';
import { GenericForm } from '../components/Form';
import { Download } from '../components/Download';
const columns = [
  {
    dataField: 'Codigo_Proyecto',
    text: 'Codigo',
  },
  {
    dataField: 'Nombre',
    text: 'Nombre',
  }
];
export const Proyectos: React.FC = () => {
  const { postFileRequest } = useRequest();
  const { GetProyectos } = Selects();
  const [file, setFile] = useState<File | null>(null)
  const [ProyectoSelect, setProyectoSelect] = useState<ISelectListItem[]>();
  const [Proyecto, setProyecto] = useState<IProyecto>({
    id: 0,
    Nombre: "",
    Codigo_Proyecto: "",
    Id_Hacienda: 0,
    Densidad: 0,
    Activo: true,

  })
  const {
    data,
    editingItem,
    createItem,
    updateItem,
    deleteItem,
    editItem,
    resetEditingItem,
  } = useCrud<IProyecto>(Endpoints.Proyecto);
  const [show, setShow] = useState(false);
  const [showImport, setshowImport] = useState(false);
  const handleShow = () => setShow(true);
  const handleCloseImport = () => setshowImport(false);
  const handleShowImport = () => setshowImport(true);
  const handleClose = () => {
    setShow(false);
    ResetForm();
  };
  const ResetForm = () => setProyecto({
    id: 0,
    Nombre: "",
    Codigo_Proyecto: "",
    Id_Hacienda: 0,
    Densidad: 0,
    Activo: true,
  });
  const handleInputChange = (name: string, value: string) => {
    setProyecto({
      ...Proyecto,
      [name]: value,
    });
  };
  const SaveLote = () => {
    createItem(Proyecto);
    handleClose();
  };
  const ImporLotes = () => {
    const formData = new FormData()
    formData.append('lotes', file as any)

    postFileRequest(Endpoints.lotes + Endpoints.Upload, formData)
      .then((e) => {
        console.log(e, formData);
      })
      .catch((error) => console.log(error.response.data));
    console.log(JSON.stringify(formData, null, 3))
  };
  const HandleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const archivo = e[0]
    if (archivo) {
      setFile(archivo)
    }
  }
  const center = { lat: 40.7128, lng: -74.0060 }; // Coordenadas de Nueva York
  const initialZoom = 12;

  const polygons = [
    {
      paths: [
        { lat: 40.7128, lng: -74.0060 },
        { lat: 40.7128, lng: -74.0160 },
        { lat: 40.7028, lng: -74.0160 },
        { lat: 40.7028, lng: -74.0060 },
      ],
      options: {
        fillColor: 'blue',
        fillOpacity: 0.5,
        strokeColor: 'red',
        strokeWeight: 2,
      },
    },
    // Otros polígonos...
  ];
  const GetData = async () => {
    setProyectoSelect(await GetProyectos());
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    <BaseLayout PageName='Proyectos'>
      <div className="row">
      </div>
      {/* <MapContainer initialCenter={center} polygons={polygons} /> */}
      <div className="container">
        <Button variant="success" onClick={handleShow}>
          <i className="bi bi-plus-circle"></i>&nbsp; Crear
        </Button>
        <Button variant="primary" onClick={handleShowImport}>
          <i className="bi bi-upload"></i>&nbsp;  Cargar
        </Button>
        <div className="row">
          <DataTable columnNames={columns} data={data}></DataTable>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Registar Proyecto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <GenericForm
                showSubmit={false}
                fields={[
                  {
                    name: "Nombre",
                    label: "Nombre",
                    bclass: "form-control",
                    placeholder: "Escriba el nombre del Proyecto",
                    value: Proyecto.Nombre, // Establece el valor de username desde el estado formData
                    onChange: (value) => handleInputChange("Nombre", value), // Maneja los cambios en el username
                  },
                  {
                    name: "Codigo_Planta",
                    label: "Código",
                    bclass: "form-control",
                    placeholder: "Ingrese el código",
                    value: Proyecto.Codigo_Proyecto, // Establece el valor de password desde el estado formData
                    onChange: (value) => handleInputChange("Codigo_Proyecto", value), // Maneja los cambios en el password
                  }
                ]}
                onSubmit={SaveLote}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={SaveLote}>
                Enviar
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showImport} onHide={handleCloseImport}>
            <Modal.Header closeButton>
              <Modal.Title>Cargar Lotes</Modal.Title>
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
                    value: Proyecto.Id_Proyecto, // Establece el valor de password desde el estado formData
                    onChange: (value) => {

                      HandleFile(value)
                    },
                  }
                ]}
                onSubmit={ImporLotes}
              />
            </Modal.Body>
            <Modal.Footer>
              <Download fileName="FormatoLotes.xlsx" Name='Formato de Lecturas' />
              <Button variant="secondary" onClick={handleCloseImport}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={ImporLotes}>
                Enviar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

    </BaseLayout>
  );
};