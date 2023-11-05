import React, {  useMemo } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory from 'react-bootstrap-table2-paginator';

export const CustomTable = ({ columns, data }) => {
  
  return (
    <div>
      <BootstrapTable
        search={true}
        sizePerPage={25}
        pagination={paginationFactory({
          sizePerPageList: [
            { text: '10', value: 10 },
            { text: '25', value: 25 },
            { text: '50', value: 50 },
            { text: '100', value: 100 },
          ],
        })}
        striped
        hover
        //condensed
        bootstrap4
        noDataIndication={() => 'No hay datos disponibles'} // Mostrar mensaje cuando no hay datos
        exportCSV={true} // Agregar botones para exportar
        csvFileName="datos.csv" // Nombre del archivo CSV
        keyField="id" // Asegúrate de ajustar esto al campo de clave única de tus datos
        data={data}
        columns={columns}
      />
      
    </div>
  );
};