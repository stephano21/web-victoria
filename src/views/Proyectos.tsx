import React, { ChangeEvent, useEffect, useState } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { Button, Modal } from 'react-bootstrap';
import { Endpoints } from '../api/routes';
import { IProyecto, ISelectListItem } from '../interfaces/AuthInterface';
import { DataTable } from '../components/DataTable';
import { Selects } from '../hooks/useSelect';
import useCrud from '../hooks/useCrud';
import { GenericForm } from '../components/Form';
import { useAuth } from '../context/AuthContext';
import { ButomsGroup } from '../components/ButomsGroup';
import { ConfirmModal } from '../components/ConfirmModal';

export const Proyectos: React.FC = () => {
  const [Proyecto, setProyecto] = useState<IProyecto>({
    id: 0,
    Nombre: "",
    Codigo_Proyecto: "",
    Id_Hacienda: 0,
    Densidad: 0,
    Activo: true,

  })
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditMode(false);
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
  const [open, setOpen] = useState(false);
  const [EditMode, setEditMode] = useState(false);
  const [ConfirmData, setConfirmData] = useState({ id: 0, text: '' });
  const Confirm = (id: number, text: string) => {
    let html = "Esta seguro de eliminar el proyecto " + text + "?";
    setConfirmData({ id, text: html });
    setOpen(true)
  }
  const RenderToEdit = (id: number) => {
    console.log("Loadata")
    resetEditingItem();

    let Current = GetItemById(id);
    console.log(Current)
    setProyecto({
      id: Current?.id ?? 0,
      Nombre: Current?.Nombre ?? "",
      Codigo_Proyecto: Current?.Codigo_Proyecto ?? "",
      Id_Hacienda: Current?.Id_Hacienda ?? 0,
    });
    setEditMode(true)
    handleShow();
  }
  const {
    data,
    editingItem,
    createItem,
    updateItem,
    deleteItem,
    GetItemById,
    resetEditingItem,
  } = useCrud<IProyecto>(Endpoints.Proyecto);
  const columns = [
    {
      dataField: 'Codigo_Proyecto',
      text: 'Codigo',
    },
    {
      dataField: 'Nombre',
      text: 'Nombre',
    },
    {
      text: 'Acciones',
      isActions: true,
      dataField: 'Codigo_Proyecto',
      actionsComponent: <ButomsGroup onDelete={Confirm} onEdit={RenderToEdit} />
    },
  ];

  const { UserData } = useAuth();
  const { GetHaciendas } = Selects();
  const [HaciendasSelect, setHaciendasSelect] = useState<ISelectListItem[]>([]);


  const handleInputChange = (name: string, value: string) => {
    setProyecto({
      ...Proyecto,
      [name]: value,
    });
  };
  const SaveProyect = () => {
    EditMode? updateItem(Proyecto.id , Proyecto):createItem(Proyecto);
    handleClose();
  };


  const GetData = async () => {
    if (UserData?.rol === "Researcher" || UserData?.rol === "Root") setHaciendasSelect(await GetHaciendas());
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    <BaseLayout PageName='Proyectos'>
      <div className="row">
      </div>
      <div className="container">
        <Button variant="success" onClick={handleShow}>
          <i className="bi bi-plus-circle"></i>&nbsp; Crear
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
              <Modal.Title>{EditMode ? "Actualizar proyecto": "Registar Proyecto"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <GenericForm
                showSubmit={false}
                fields={UserData?.rol !== "Researcher" ? [
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
                ] : [
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
                  },
                  {
                    name: "Id_Hacienda",
                    label: "Hacienda",
                    bclass: "form-control",
                    placeholder: "Ingrese el código",
                    inputType: "select",
                    options: HaciendasSelect,
                    value: Proyecto.Id_Hacienda, // Establece el valor de password desde el estado formData
                    onChange: (value) => handleInputChange("Id_Hacienda", value.value), // Maneja los cambios en el password
                  }
                ]}
                onSubmit={SaveProyect}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={SaveProyect}>
                Enviar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

    </BaseLayout>
  );
};