import React, { ChangeEvent, useEffect, useState } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { ILectura, ISelectListItem } from '../interfaces/AuthInterface';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GenericForm } from '../components/Form';
import { Download } from '../components/Download';
import { DataTable } from '../components/DataTable';
import { IDateFilter } from '../interfaces/FilterInteface';
import { DateRangePicker } from 'rsuite';
import { Selects } from '../hooks/useSelect';
import { SelectSearch } from '../components/SelectSearch';
const columns = [
  {
    dataField: 'NombrePlanta',
    text: 'Planta',
  },
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
  const { postFileRequest, getRequest } = useRequest();
  const [PlantasSelect, setPlantasSelect] = useState<ISelectListItem[]>([]);
  const {GetLotes } = Selects();
  type ValueType = [Date | null, Date | null];
  const [Range, setRange] = useState<ValueType>([new Date(), new Date()]);
  const [DateFilter, setDateFilter] = useState<IDateFilter>({
    to: new Date().toISOString().split('T')[0],
    from: new Date().toISOString().split('T')[0],
  });
  const [data, setData] = useState<ILectura[]>([]);
  const [file, setFile] = useState<File | null>(null)
  const [show, setShow] = useState(false);
  //functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const ImporLecturas = () => {
    const formData = new FormData()
    formData.append('lecturas', file as any)

    postFileRequest(Endpoints.Lectura + Endpoints.Upload, formData)
      .then((e) => {
        console.log(e, formData);
      })
      .catch((error) => console.log(error.response.data));
    console.log(JSON.stringify(formData, null, 3))
  };
  const ResetDate = () => {
    setDateFilter({
      from: "",
      to: ""
    });
    setRange([null, null])
  };
  const SetearFile = (e: ChangeEvent<HTMLInputElement>) => {
    const archivo = e[0]
    if (archivo) {
      setFile(archivo)
    }
  }
  //call api
  const GetData = async () => {
    await getRequest<ILectura[]>(Endpoints.Lectura, DateFilter)
      .then((e) => {
        setData(e)
      })
      .catch((error) => alert(error));

  };
  const GetPlantasFilter = async () => {
    setPlantasSelect(await GetLotes())

  }
  useEffect(() => {
    GetData();
  }, [Range]);

  useEffect(() => {
    GetPlantasFilter();
  }, []);
  return (
    <BaseLayout PageName='Lecturas'>
      <div className='container'>

        <div className='d-flex flex-row'>
          <div className="p-2">
            <Button variant="primary" onClick={handleShow}>
              <i className="bi bi-upload"></i>&nbsp;  Cargar
            </Button>
          </div>
          <div className="col-sm-3 p-2">

            <DateRangePicker
              showOneCalendar
              value={Range}
              cleanable={true}
              onClean={ResetDate}
              onChange={(value) => {
                // Si el valor es nulo, no actualizamos el estado
                if (value !== null) {
                  // Formateamos las fechas en formato "yyyy-mm-dd"
                  const fromDate = value[0]?.toISOString().split('T')[0] || "";
                  const toDate = value[1]?.toISOString().split('T')[0] || "";
                  setDateFilter({
                    from: fromDate,
                    to: toDate,
                  });
                  setRange(value);
                }
              }} />
          </div>
          <div className="col-sm-2 p-2">
            <SelectSearch
              options={PlantasSelect}
            ></SelectSearch>
          </div>
        </div>
        <DataTable data={data} columnNames={columns} actionsColumn={<button />}></DataTable>
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
                  value: "xd", // Establece el valor de password desde el estado formData
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
            <Download fileName="FormatoLecturas.xlsx" Name='Formato de Lecturas' />

            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={ImporLecturas}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    </BaseLayout>
  )
}