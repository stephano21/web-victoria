// DataTable.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { toBlob } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { SelectSearch } from './SelectSearch';

interface DataTableProps {
    columnNames?: HeaderProp[];
    data: object[];
    fileName?: string;
    itemsPerPage?: number;
    itemsPerPageOptions?: number[];
    actionsColumn?: React.ReactNode;
}
interface HeaderProp {
    dataField: string;
    text: string;
}
export const DataTable: React.FC<DataTableProps> = ({
    columnNames,
    data,
    fileName,
    itemsPerPageOptions = [5, 10, 20, -1],
    actionsColumn, }) => {
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
    // Estado para el filtro
    const [filter, setFilter] = useState('');
    //paginas a mostar

    // Estado para el ordenamiento
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    //paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Genera las columnas con keys basadas en los nombres
    const columns = columnNames?.map((columnName, index) => ({
        key: columnName.dataField, // Reemplaza espacios con guiones bajos y convierte a minúsculas
        title: columnName.text,
    }));

    // Función para manejar cambios en el filtro
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1);
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
        setCurrentPage(1);
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
        pdf.save(`${fileName !== undefined ? fileName : screenName}` + `_${year}${month}${day}_${hours}${minutes}.pdf`);
    };
    const generatePDF = () => {
        // Crear el blob PDF y descargarlo
        ReactPDF.render(<div className="datatable-container">
            <div className="d-flex flex-row-reverse">
                <div className="p-2"><input
                    type="text"
                    placeholder="Buscar..."
                    value={filter}
                    className="form-control "
                    onChange={handleFilterChange}
                /></div>
                <div className="p-1"></div>
                <div className="p-1">
                    <button onClick={exportToExcel} className="btn btn-success"><i className="bi bi-file-excel"></i></button>
                </div>
                <div className="p-1">
                    <button onClick={exportToPDF} className="btn btn-danger"><i className="bi bi-filetype-pdf"></i></button>
                </div>
                <div className='p-1'>
                    <div className="items-per-page">
                        <SelectSearch
                            value={PAGES_TO_SHOW.toString()}
                            onChange={handleItemsPerPageChange}
                            options={itemsPerPageOptions.map((option) => {
                                return {
                                    value: option.toString(),
                                    label: option == -1 ? "Todos" : option.toString(),
                                }
                            })}
                        />

                    </div>
                </div>
            </div>
            {/* Filtro */}

            {/* Tabla */}
            <table className="datatable">
                <thead>
                    <tr>
                        {columns?.map((column) => (
                            <th key={column.key} onClick={() => handleSort(column.key)}>
                                {column.title} {sortColumn === column.key && (sortDirection === 'asc' ? '▲' : '▼')}
                            </th>
                        ))}
                        {actionsColumn && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row, rowIndex) => (
                        <tr key={`row_${rowIndex}`}>
                            {columnNames?.map((column) => (
                                <td key={column.dataField}>{row[column.dataField]}</td>
                            ))}
                            {actionsColumn && <td>{actionsColumn}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Paginación */}
            <div className="d-flex justify-content-between">
                <div className="p-2">
                    <span>Mostrando {startPage} al {endPage} de {data.length} registros</span>
                </div>
                <div className="p-2">
                    <ul className="pagination">
                        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                            <a onClick={() => handlePageChange(currentPage - 1)} className="page-link">
                                Prev
                            </a>
                        </li>

                        {startPage > 1 && (
                            <li className="page-item">
                                <a
                                    onClick={() => handlePageChange(startPage - PAGES_TO_SHOW)}
                                    className="page-link">{'<<'}</a>
                            </li>
                        )}
                        {pageNumbers.map((page) => (
                            currentPage === page ? (
                                <li className="page-item active" aria-current="page">
                                    <span className="page-link"> {page}</span>
                                </li>
                            ) : (
                                <li className="page-item">
                                    <a className="page-link"
                                        onClick={() => handlePageChange(page)}> {page}</a>
                                </li>
                            )

                        ))}
                        {endPage < totalPages && (
                            <li className="page-item">
                                <a onClick={() => handlePageChange(endPage + PAGES_TO_SHOW)}
                                    className="page-link">{'>>'}</a>
                            </li>

                        )}
                        <li className={currentPage === totalPages ? "page-item disabled" : "page-item"}>
                            <a onClick={() => handlePageChange(currentPage + 1)}
                                className="page-link">
                                Next
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>, `${fileName !== undefined ? fileName : screenName}` + `_${year}${month}${day}_${hours}${minutes}.pdf`);

    };
    // Exportar a Excel
    const exportToExcel = () => {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        // Guardar el archivo Excel
        saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), `${fileName !== undefined ? fileName : screenName}` + `_${year}${month}${day}_${hours}${minutes}.xlsx`);
    };

    const sortedData = sortColumn ? filteredData.slice().sort(compare) : filteredData;
    // Lógica de paginación
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.value));
        setCurrentPage(1);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    //const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    let currentItems: object[] = [];
    let totalPages = 0;

    if (itemsPerPage === -1) {
        // Si la opción "Mostrar todos" está seleccionada, mostramos todos los elementos
        currentItems = sortedData;
    } else {
        // Si se selecciona una cantidad específica de elementos por página
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
        totalPages = Math.ceil(sortedData.length / itemsPerPage);
    }
    const PAGES_TO_SHOW = 5;
    // Calcular el rango de páginas a mostrar
    const startPage = Math.max(1, currentPage - Math.floor(PAGES_TO_SHOW / 2));
    const endPage = Math.min(totalPages, startPage + PAGES_TO_SHOW - 1);

    // Array de páginas a mostrar en la paginación
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="datatable-container">
            <div className="d-flex flex-row-reverse">
                <div className="p-2"><input
                    type="text"
                    placeholder="Buscar..."
                    value={filter}
                    className="form-control "
                    onChange={handleFilterChange}
                /></div>
                <div className="p-1"></div>
                <div className="p-1">
                    <button onClick={exportToExcel} className="btn btn-success"><i className="bi bi-file-excel"></i></button>
                </div>
                <div className="p-1">
                    <button onClick={generatePDF} className="btn btn-danger"><i className="bi bi-filetype-pdf"></i></button>
                </div>
                <div className='p-1'>
                    <div className="items-per-page">
                        <SelectSearch
                            value={PAGES_TO_SHOW.toString()}
                            onChange={handleItemsPerPageChange}
                            options={itemsPerPageOptions.map((option) => {
                                return {
                                    value: option.toString(),
                                    label: option == -1 ? "Todos" : option.toString(),
                                }
                            })}
                        />
                        {/* <select value={itemsPerPage}
                            className="form-select"
                            onChange={handleItemsPerPageChange}>
                            {itemsPerPageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option === -1 ? 'Mostrar todos' : option}
                                </option>
                            ))}
                        </select> */}
                    </div>
                </div>
            </div>
            {/* Filtro */}

            {/* Tabla */}
            <table className="datatable">
                <thead>
                    <tr>
                        {columns?.map((column) => (
                            <th key={column.key} onClick={() => handleSort(column.key)}>
                                {column.title} {sortColumn === column.key && (sortDirection === 'asc' ? '▲' : '▼')}
                            </th>
                        ))}
                        {actionsColumn && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row, rowIndex) => (
                        <tr key={`row_${rowIndex}`}>
                            {columnNames?.map((column) => (
                                <td key={column.dataField}>{row[column.dataField]}</td>
                            ))}
                            {actionsColumn && <td>{actionsColumn}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Paginación */}
            <div className="d-flex justify-content-between">
                {/* <div className="p-2">
                    <span>Mostrando {startPage} al {endPage} de {data.length} registros</span>
                </div> */}
                <div className="p-2">
                    <ul className="pagination">
                        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                            <a onClick={() => handlePageChange(currentPage - 1)} className="page-link">
                                Prev
                            </a>
                        </li>

                        {startPage > 1 && (
                            <li className="page-item">
                                <a
                                    onClick={() => handlePageChange(startPage - PAGES_TO_SHOW)}
                                    className="page-link">{'<<'}</a>
                            </li>
                        )}
                        {pageNumbers.map((page) => (
                            currentPage === page ? (
                                <li className="page-item active" aria-current="page">
                                    <span className="page-link"> {page}</span>
                                </li>
                            ) : (
                                <li className="page-item">
                                    <a className="page-link"
                                        onClick={() => handlePageChange(page)}> {page}</a>
                                </li>
                            )

                        ))}
                        {endPage < totalPages && (
                            <li className="page-item">
                                <a onClick={() => handlePageChange(endPage + PAGES_TO_SHOW)}
                                    className="page-link">{'>>'}</a>
                            </li>

                        )}
                        <li className={currentPage === totalPages ? "page-item disabled" : "page-item"}>
                            <a onClick={() => handlePageChange(currentPage + 1)}
                                className="page-link">
                                Next
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
};
