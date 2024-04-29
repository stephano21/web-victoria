import React, { ChangeEvent, useEffect, useState, Fragment } from "react"
import { BaseLayout } from "../components/BaseLayout"
import { useRequest } from "../api/UseRequest";
import { Endpoints } from "../api/routes";
import { DataTable } from "../components/DataTable";
import { Button, Modal } from "react-bootstrap";
import { GenericForm } from "../components/Form";
import { Message } from "rsuite";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Tooltip,
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ISync } from "../interfaces/AnalytisInterfaces";

const columns = [

  {
    dataField: 'Device',
    text: 'Código',
  },
  {
    dataField: 'Date',
    text: 'Fecha',
  },
  {
    dataField: 'Usuario',
    text: "Usuario de sincronizacion",
  },
  {
    dataField: 'Temp_Air_Mean',
    text: "Temperatura Maxima",
  }
  // Agrega más columnas según sea necesario
];
export const Sincronizaciones = () => {
  const { getRequest, postFileRequest } = useRequest();
  const [data, setData] = useState<ISync>({
    data: [],
    analytics: []
  });
  const [file, setFile] = useState<File | null>(null)
  const [showImport, setshowImport] = useState(false);
  const handleCloseImport = () => setshowImport(false);
  const handleShowImport = () => setshowImport(true);
  const GetData =() =>{
    getRequest<ISync>(Endpoints.WeatherData)
      .then((e) => {
        setData(e)
        console.log(e);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    GetData()
  }, []);
  const SetWeatherCSV = (e: ChangeEvent<HTMLInputElement>) => {
    const archivo = e[0]
    if (archivo) {
      setFile(archivo)
    }
  }
  const ImportWeatherData = () => {
    const formData = new FormData()
    formData.append('weather', file as any)

    postFileRequest(Endpoints.WeatherUpload, formData)
      .then((e) => {
        GetData()
        handleCloseImport()
        console.log(e, formData);
      })
      .catch((error) => console.log(error.response.data));
    console.log(JSON.stringify(formData, null, 3))
  };
  return (
    <BaseLayout PageName="Clima">
      <div className='container'>
        <Button variant="primary" onClick={handleShowImport}>
          <i className="bi bi-upload"></i>&nbsp; Importar
        </Button>
        <div className="d-flex justify-content-center">
            <ResponsiveContainer width="100%" height="100%">
              <Fragment>
                <LineChart width={900} height={300} data={data?.analytics} >
                  <Line type="monotone" name="NDVI" dataKey="Ndvi" stroke="#09CB00" />
                  <Line type="monotone" name="Temperatura Mínima" unit={" C°"} dataKey="Temp_Air_Min" stroke="#0031FA" />
                  <Line type="monotone" name="Temperatura de Rocio Máxima" dataKey="Dew_Temp_Max" unit={" C°"} stroke="#FF8000" />
                  <Line type="monotone" name="Temperatura Máxima" unit={" C°"} dataKey="Temp_Air_Max" stroke="#FA0000" />
                  <Line type="monotone" name="Evapotranspiration del cultivo" dataKey="Evapotranspiration_Crop" unit={" mm"} stroke="#000000" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="Date" />
                  
                  <Tooltip />
                </LineChart>
              </Fragment>
            </ResponsiveContainer>
          </div>
        <DataTable columnNames={columns} data={data?.data}></DataTable>
      </div>
      <Modal show={showImport} onHide={handleCloseImport}>
        <Modal.Header closeButton>
          <Modal.Title>Cargar datos de Arable</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Message type="info" centered showIcon header="Indicaciones para importar los datos climáticos!">
            <p>
              Se requiere de un archivo .csv proporcionado por la plataforma de <a href="https://app.arable.com/auth/(auth_view:login)">Arable</a> 
            </p>
            <ul>
              <li>El archivo debe contener datos diarios (Daily)</li>
              <li>Temperatura en °C </li>
              <li>Milimetros</li>
              <li>Kilometros por hora</li>
            </ul>
            <p>Subir el archivo tal cual se descargó de la plataforma</p>
          </Message>
          <GenericForm
            showSubmit={false}
            fields={[
              {
                name: "Id_Lote",
                label: "Archivo CSV",
                bclass: "form-control",
                placeholder: "Ingrese el código",
                inputType: "file",
                value: file?.name, 
                onChange: (value) => {

                  SetWeatherCSV(value)
                },
              }
            ]}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseImport}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={ImportWeatherData}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </BaseLayout>
  )
}