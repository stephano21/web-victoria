import React, { ChangeEvent, useEffect, useState } from 'react';
import MapContainer from './../components/Map'; // Asegúrate de importar el componente MapContainer desde el lugar correcto
import { BaseLayout } from '../components/BaseLayout';
import { Button, Modal } from 'react-bootstrap';
import { Endpoints } from '../api/routes';
import { ILote, ISelectListItem } from '../interfaces/AuthInterface';
import { useRequest } from '../api/UseRequest';
import { DataTable, HeaderProp } from '../components/DataTable';
import { Selects } from '../hooks/useSelect';
import useCrud from '../hooks/useCrud';
import { GenericForm } from '../components/Form';
import { Download } from '../components/Download';
import { ButomsGroup } from '../components/ButomsGroup';
import { ConfirmModal } from '../components/ConfirmModal';
import { tr } from 'date-fns/locale';

export const Lotes: React.FC = () => {
  const { postFileRequest } = useRequest();
  const { GetProyectos } = Selects();
  const [EditMode, setEditMode] = useState(false);
  const [file, setFile] = useState<File | null>(null)
  const [ProyectoSelect, setProyectoSelect] = useState<ISelectListItem[]>();
  const [Lote, setLote] = useState<ILote>({
    id: 0,
    Nombre: "",
    Codigo_Lote: "",
    Id_Proyecto: 0,
    Hectareas: 0,
    Activo: true,
    Variedad: "",

  })
  const [show, setShow] = useState(false);
  const [showImport, setshowImport] = useState(false);
  const handleShow = () => setShow(true);
  const handleCloseImport = () => setshowImport(false);
  const handleShowImport = () => setshowImport(true);
  const handleClose = () => {
    setShow(false);
    ResetForm();
  };

  const ResetForm = () => setLote({
    id: 0,
    Nombre: "",
    Codigo_Lote: "",
    Id_Proyecto: 0,
    Hectareas: 0,
    Activo: true,
    Variedad: "",

  });
  const {
    data,
    fetchData,
    editingItem,
    createItem,
    updateItem,
    deleteItem,
    GetItemById,
    resetEditingItem,
  } = useCrud<ILote>(Endpoints.lotes);
  const [open, setOpen] = useState(false);
  const [ConfirmData, setConfirmData] = useState({ id: 0, text: '' });
  const Confirm = (id: number, text: string) => {
    let html = "Esta seguro de eliminar el lote " + text + "?";
    setConfirmData({ id, text: html });
    setOpen(true)
    console.log('confirm', id, text)
  }
  const RenderToEdit = (id: number) => {
    console.log("Loadata")
    resetEditingItem();

    let Current = GetItemById(id);
    console.log(Current)
    setLote({
      id: Current?.id ?? 0,
      Nombre: Current?.Nombre ?? "",
      Codigo_Lote: Current?.Codigo_Lote ?? "",
      Id_Proyecto: Current?.Id_Proyecto ?? 0,
      Variedad: Current?.Variedad ?? "",
      Hectareas: Current?.Hectareas ?? 0,
      Num_Plantas: Current?.Num_Plantas ?? 0,
    });
    setEditMode(true)
    handleShow();
  }
  const columns: HeaderProp[] = [
    {
      dataField: 'Codigo_Lote',
      text: 'Codigo',
    },
    {
      dataField: 'Nombre',
      text: 'Nombre',
    },
    {
      dataField: 'Hectareas',
      text: 'Hectareas',
    },
    {
      dataField: 'Variedad',
      text: 'Variedad',
    },
    {
      dataField: 'Edad',
      text: 'Edad',
    },
    {
      dataField: 'FechaSiembra',
      text: 'Fecha de Siembra',
    },
    {
      dataField: 'Num_Plantas',
      text: 'Plantas',
    },
    {
      text: 'Acciones',
      isActions: true,
      dataField: 'Codigo_Lote',
      actionsComponent: <ButomsGroup onDelete={Confirm} onEdit={RenderToEdit} />
    },
  ];

  const handleInputChange = (name: string, value: string) => {
    setLote({
      ...Lote,
      [name]: value,
    });
  };
  const SaveLote = () => {
    EditMode? updateItem(Lote.id, Lote): createItem(Lote);
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
    fetchData();
    handleCloseImport();
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
    <BaseLayout PageName='Lotes'>
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
          <ConfirmModal
            id={ConfirmData.id}
            text={ConfirmData.text}
            onConfirm={() => {
              deleteItem(ConfirmData.id);
              setOpen(false);
            }}
            visible={open}
            setVisible={setOpen}
          ></ConfirmModal>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Registar Lote</Modal.Title>
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
                    value: Lote.Nombre, // Establece el valor de username desde el estado formData
                    onChange: (value) => handleInputChange("Nombre", value), // Maneja los cambios en el username
                  },
                  {
                    name: "Codigo_Planta",
                    label: "Código",
                    bclass: "form-control",
                    placeholder: "Ingrese el código",
                    value: Lote.Codigo_Lote, // Establece el valor de password desde el estado formData
                    onChange: (value) => handleInputChange("Codigo_Lote", value), // Maneja los cambios en el password
                  },
                  {
                    name: "lat",
                    label: "Variedad",
                    bclass: "form-control",
                    placeholder: "Ingrese la variedad",
                    value: Lote.Variedad, // Establece el valor de password desde el estado formData
                    onChange: (value) => handleInputChange("Variedad", value), // Maneja los cambios en el password
                  },
                  {
                    name: "lng",
                    inputType: "number",
                    label: "Hectáreas",
                    bclass: "form-control",
                    placeholder: "Ingrese las hectáreas",
                    value: Lote.Hectareas, // Establece el valor de password desde el estado formData
                    onChange: (value) => handleInputChange("Hectareas", value), // Maneja los cambios en el password
                  },
                  {
                    name: "Num_Plantas",
                    inputType: "number",
                    label: "Plantas",
                    bclass: "form-control",
                    placeholder: "Ingrese numero de plantas del lote",
                    value: Lote.Num_Plantas, // Establece el valor de password desde el estado formData
                    onChange: (value) => handleInputChange("Num_Plantas", value), // Maneja los cambios en el password
                  },
                  {
                    name: "Id_Lote",
                    label: "Proyecto",
                    bclass: "form-control",
                    placeholder: "Ingrese el código",
                    inputType: "select",
                    options: ProyectoSelect,
                    value: Lote.Id_Proyecto, // Establece el valor de password desde el estado formData
                    onChange: (value) => handleInputChange("Id_Proyecto", value.value), // Maneja los cambios en el password
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
                    value: Lote.Id_Proyecto, // Establece el valor de password desde el estado formData
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