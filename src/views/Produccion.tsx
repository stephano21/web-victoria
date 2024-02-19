import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { IProduccion, ISelectListItem } from '../interfaces/AuthInterface';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GenericForm } from '../components/Form';
import { Download } from '../components/Download';
import { DataTable } from '../components/DataTable';
import useCrud from '../hooks/useCrud';
import { Selects } from '../hooks/useSelect';
//import { AlertContext, AlertType } from '../context/AlertContext';
const columns = [
  {
    dataField: 'Lote',
    text: 'Lote',
  },
  {
    dataField: 'Qq',
    text: 'Quintales',
  },
  {
    dataField: 'Fecha_Produccion',
    text: 'Fecha',
  },
];


export const Produccion = () => {
  //const
  const { getRequest, postFileRequest } = useRequest();
  const [data, setData] = useState<IProduccion[]>([]);
  const [LotesSelect, setLotesSelect] = useState<ISelectListItem[]>([]);
  const [file, setFile] = useState<File | null>(null)
  const { GetLotes } = Selects();
  const [Produccion, setProduccion] = useState<IProduccion>({
    Fecha: "",
    Qq: 0,
    Id_Lote: 0,
  });
  const [show, setShow] = useState(false);
  const [showImport, setshowImport] = useState(false);
  //functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handImportleClose = () => setshowImport(false);
  const handImportleShow = () => setshowImport(true);
  const handleInputChange = (name: string, value: string) => {
    setProduccion({
      ...Produccion,
      [name]: value,
    });
  };
  const {
    createItem,
  } = useCrud<IProduccion>(Endpoints.Produccion);
  //call api
  const GetData = async () => {
    await getRequest<IProduccion[]>(Endpoints.Produccion)
      .then((e) => {
        setData(e)
        console.log(e);
      })
      .catch((error) => console.log(error));
    setLotesSelect(await GetLotes())
  };
  useEffect(() => {
    GetData();
  }, []);
  const HandleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const archivo = e[0]
    if (archivo) {
      setFile(archivo)
    }
  }
  const RegisterProducction = () => {
    createItem(Produccion)
  }
  const ImportProduccion = () => {
    const formData = new FormData()
    formData.append('produccion', file as any)

    postFileRequest(Endpoints.Produccion + Endpoints.Upload, formData)
      .then((e) => {
        console.log(e, formData);
      })
      .catch((error) => console.log(error.response.data));
  };
  return (
    <BaseLayout PageName='Produccion'>
      <div className='container'>
        <Button variant="success" onClick={handleShow}>
          <i className="bi bi-plus-circle"></i>&nbsp; Crear
        </Button>
        <Button variant="primary" onClick={handImportleShow}>
          <i className="bi bi-upload"></i>&nbsp;  Cargar
        </Button>

        <DataTable columnNames={columns} data={data}></DataTable>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Registar Producción</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GenericForm
              showSubmit={false}
              fields={[
                {
                  name: "Nombre",
                  label: "Quintales",
                  bclass: "form-control",
                  placeholder: "Escriba el nombre del lote",
                  value: Produccion.Qq,
                  onChange: (value) => handleInputChange("Qq", value),
                },
                {
                  name: "Codigo",
                  label: "Fecha",
                  bclass: "form-control",
                  placeholder: "Ingrese el código",
                  inputType: "date",
                  value: Produccion.Fecha,
                  onChange: (value) => handleInputChange("Fecha", value),
                },
                {
                  name: "Id_Lote_id",
                  label: "Lote",
                  bclass: "form-control",
                  placeholder: "Ingrese el código",
                  inputType: "select",
                  options: LotesSelect,
                  value: Produccion.Id_Lote,
                  onChange: (value) => handleInputChange("Id_Lote", value.value),
                }
              ]}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={RegisterProducction}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showImport} onHide={handImportleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Importar Producción</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GenericForm
              showSubmit={false}
              fields={[
                {
                  name: "Id_Lote_id",
                  label: "Lote",
                  bclass: "form-control",
                  placeholder: "Ingrese el código",
                  inputType: "file",
                  value: file?.name,
                  onChange: (value) => {
                    HandleFile(value)
                  },
                }
              ]}
            />
          </Modal.Body>
          <Modal.Footer>
            <Download fileName="FormatoProduccion.xlsx" Name='Formato de Lecturas' />
            <Button variant="secondary" onClick={handImportleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={ImportProduccion}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    </BaseLayout>
  )
}