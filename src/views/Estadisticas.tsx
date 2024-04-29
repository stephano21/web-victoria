import React, { useEffect, useState, useRef, Fragment } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { Endpoints } from '../api/routes';
import { useRequest } from '../api/UseRequest';
import { IAnalytics } from '../interfaces/AnalytisInterfaces';
//Reportes
import { Document, Page, pdfjs } from 'react-pdf';
import * as XLSX from 'xlsx';
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
import { IDateFilter } from '../interfaces/FilterInteface';
import { DateToString } from '../helpers/FormatDate';
import { convertChartToImage } from '../helpers/ChartToImage';
import { useAnalytics } from '../hooks/useAnalytics';
import { DateRangePicker } from 'rsuite';
import { useLocation } from 'react-router-dom';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};
export const Estadisticas = () => {
  const { getRequest } = useRequest();
  const { GetEstadisticas } = useAnalytics();

  const [data, setData] = useState<IAnalytics>();
  // const {GetLotes, pointInRegion, getPlantas} = Selects();
  type ValueType = [Date, Date];
  const [Range, setRange] = useState<ValueType>();
  const [DateFilter, setDateFilter] = useState<IDateFilter>({
    to: "",
    from: "",
  });
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  //Generate file name
  const location = useLocation();
  // Obtener el nombre de la ruta actual
  const pathname = location.pathname;
  const screenName = pathname.substring(1); // Eliminar el primer caracter ("/")
  const currentDateTime = new Date();
  const year = currentDateTime.getFullYear();
  const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
  const day = String(currentDateTime.getDate()).padStart(2, '0');
  const hours = String(currentDateTime.getHours()).padStart(2, '0');
  const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
  //call api
  const GetData = async () => {
    setData(await GetEstadisticas(DateFilter));
  };
  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos
    GetData();
  }, [DateFilter]);
  const generateExcelReport = () => {
    const workbook = XLSX.utils.book_new();

    // Agregar hoja de cálculo para el rango de fechas
    const worksheetDates = XLSX.utils.json_to_sheet([
      { 'Fecha Desde': DateFilter.from, 'Fecha Hasta': DateFilter.to },
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheetDates, 'Fechas');

    // Agregar hoja de cálculo para los datos de lecturas
    const worksheetData = XLSX.utils.json_to_sheet(data?.Lecturas || []);
    XLSX.utils.book_append_sheet(workbook, worksheetData, 'Lecturas');

    // Agregar hoja de cálculo para los datos de árboles
    const worksheetTrees = XLSX.utils.json_to_sheet(data?.Trees || []);
    XLSX.utils.book_append_sheet(workbook, worksheetTrees, 'Plantas');

    // Agregar hoja de cálculo para los datos de producción
    const worksheetProduccion = XLSX.utils.json_to_sheet(data?.Produccion || []);
    XLSX.utils.book_append_sheet(workbook, worksheetProduccion, 'Produccion');

    // Agregar hoja de cálculo para los datos de enfermedades
    const worksheetEnfermedades = XLSX.utils.json_to_sheet(data?.Enfermedades || []);
    XLSX.utils.book_append_sheet(workbook, worksheetEnfermedades, 'Enfermedades');

    // Guardar el archivo Excel
    
    XLSX.writeFile(workbook, `${screenName}` + `_${year}${month}${day}_${hours}${minutes}.xlsx`);
  };
  const generatePDF = async () => {
    if (1 == 1) return;
    const barChartImage = await convertChartToImage(barChartRef);
    const lineChartImage = await convertChartToImage(lineChartRef);

    // Crear el documento PDF
    const pdf = (
      <Document>
        <Page>
          <h1>Informe PDF</h1>
          <p>Texto del informe.</p>

          {barChartImage && <img src={barChartImage} alt="Gráfico de Barras" />}
          {lineChartImage && <img src={lineChartImage} alt="Gráfico de Línea" />}
        </Page>
      </Document>
    );

    // Descargar el documento PDF
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'reporte.pdf';
    link.click();
  };
  return (
    <BaseLayout PageName='Estadisticas'>
      <div className='container'>
        <div className='d-flex flex-row-reverse'>
          <div className="p-2">
            <DateRangePicker
              showOneCalendar
              value={Range}
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

          <div className="p-2">
            <button className="btn btn-success" onClick={generateExcelReport}>
              <i className="bi bi-file-excel"></i>
            </button>
          </div>
          {/* <div className="p-2">
            <button className="btn btn-danger" onClick={generatePDF}>
              <i className="bi bi-file-pdf"></i>
            </button>
          </div> */}
        </div>
        <div className="row text-center">
          <h5>{DateFilter.from !== '' && DateFilter.to ?
            `Datos desde ${DateToString(DateFilter.from)} hasta ${DateToString(DateFilter.to)}` :
            DateFilter.from !== '' ? `Datos desde ${DateToString(DateFilter.from)}` :
              DateFilter.to !== '' ? `Datos hasta ${DateToString(DateFilter.to)}` : 'Todos los datos'}</h5>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            {/*<h1>Pantalla en espera...<Spinner animation="border" variant='success' /></h1>*/}
          </div>
          {/* ESTADIOS */}
          <div className="col-md-6 text-center">
            <ResponsiveContainer width="100%" height="100%" ref={lineChartRef}>
              <Fragment>
                <h5>Mazorcas promedio por estadio</h5>
                <LineChart width={600} height={300} data={data?.Lecturas} >
                  <Line type="monotone" name='Estadio 1' unit={' qq'} dataKey="E1" stroke="#49942D" />
                  <Line type="monotone" name='Estadio 2' unit={' qq'} dataKey="E2" stroke="#64942D" />
                  <Line type="monotone" name='Estadio 3' unit={' qq'} dataKey="E3" stroke="#BCBA35" />
                  <Line type="monotone" name='Estadio 4' unit={' qq'} dataKey="E4" stroke="#F18E16" />
                  <Line type="monotone" name='Estadio 5' unit={' qq'} dataKey="E5" stroke="#F15516" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="Victoria" />
                  <YAxis unit={" Σ Mz"} />
                  <Tooltip />
                </LineChart>
              </Fragment>
            </ResponsiveContainer>
          </div>
          {/* ENFERMEDADES */}
          <div className="col-md-6 text-center">
            <ResponsiveContainer width="100%" height="100%" ref={barChartRef}>
              <Fragment>
                <h5>Enfermedades por Victoria</h5>
                <LineChart width={600} height={300} data={data?.Enfermedades}>
                  <XAxis dataKey="Victoria"  />
                  <Line type="monotone" dataKey="GR1" name='Grado 1' stroke="#198754" />
                  <Line type="monotone" dataKey="GR2" name='Grado 2' stroke="#C6FF03" />
                  <Line type="monotone" dataKey="GR3" name='Grado 3' stroke="#FFAF03" />
                  <Line type="monotone" dataKey="GR4" name='Grado 4' stroke="#FF5703" />
                  <Line type="monotone" dataKey="GR5" name='Grado 5' stroke="#FF0303" />
                  <Line type="monotone" dataKey="Cherelles" stroke="#000000" />
                  <Tooltip />
                  <YAxis unit={" Σ Mz"} name='Test' />
                </LineChart>
              </Fragment>
            </ResponsiveContainer>
          </div>
          {/* PRODUCCION */}
          <div className="col-md-6 text-center ">
            <ResponsiveContainer width={"100%"} height="100%">
              <Fragment>
                <h5>Producción por victoria en Quintales </h5>
                <LineChart width={600} height={300} data={data?.Produccion} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <Line type="monotone" dataKey="qq" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="Victoria" />
                  <YAxis unit={" qq"} />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </Fragment>
            </ResponsiveContainer>
          </div>
          <div className="col-md-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data?.Trees}>
                <RadialBar
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  dataKey="Plantas"
                />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}