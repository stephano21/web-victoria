// DataTable.js
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { toBlob } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
interface DataTableProps {
  columnNames: string[];
  data: Record<string, string | number>[];
}
export const DataTable : React.FC<DataTableProps> = ({ columnNames, data }) => {
  // Estado para el filtro
  const [filter, setFilter] = useState('');

  // Estado para el ordenamiento
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Genera las columnas con keys basadas en los nombres
  const columns = columnNames.map((columnName, index) => ({
    key: columnName.replace(/\s+/g, '_').toLowerCase(), // Reemplaza espacios con guiones bajos y convierte a minúsculas
    title: columnName,
  }));

  // Función para manejar cambios en el filtro
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Función para manejar el ordenamiento de las columnas
  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      // Cambiar dirección si la columna está siendo ordenada
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Ordenar por la nueva columna
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  // Función de comparación para ordenamiento
  const compare = (a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  };

  // Aplicar filtros y ordenamiento
  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) => String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );
   // Exportar a PDF
   const exportToPDF = async () => {
    const gridRef = React.createRef<HTMLDivElement>();
    if (!gridRef.current) {
      console.log(gridRef);
      console.error('Ref not assigned correctly');
      return;
    }

    // Generar una imagen de la tabla
    const blob = await toBlob(gridRef.current as HTMLElement);
    console.log(blob)
    const dataURL = URL.createObjectURL(blob);

    // Crear un nuevo PDF
    const pdf = new jsPDF();
    pdf.addImage(dataURL, 'JPEG', 10, 10, 190, 0);
    pdf.save('table.pdf');
  };

  // Exportar a Excel
  const exportToExcel = () => {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Guardar el archivo Excel
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'table.xlsx');
  };

  const sortedData = sortColumn ? filteredData.slice().sort(compare) : filteredData;

  return (
    <div className="datatable-container">
    {/* Filtro */}
    <input
      type="text"
      placeholder="Filter..."
      value={filter}
      onChange={handleFilterChange}
    />
    <button onClick={exportToPDF}>Export to PDF</button>
        <button onClick={exportToExcel}>Export to Excel</button>
    {/* Tabla */}
    <table className="datatable">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} onClick={() => handleSort(column.key)}>
              {column.title} {sortColumn === column.key && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <tr key={`row_${rowIndex}`}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};
