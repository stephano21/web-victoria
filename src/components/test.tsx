import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

interface Person {
  id: number;
  name: string;
  age: number;
}

const { ExportCSVButton } = CSVExport;

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    sort: true,
  },
  {
    dataField: 'name',
    text: 'Name',
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: 'age',
    text: 'Age',
    sort: true,
  },
];

const data: Person[] = [
  { id: 1, name: 'John Doe', age: 25 },
  { id: 2, name: 'Jane Smith', age: 30 },
  // Add more data as needed
];

const Table: React.FC = () => {
  return (
    <ToolkitProvider
      keyField="id"
      data={data}
      columns={columns}
      bootstrap4
      search
      exportCSV
    >
      {props => (
        <div>
          <ExportCSVButton {...props.csvProps}>Export CSV</ExportCSVButton>
          <BootstrapTable
            {...props.baseProps}
            filter={filterFactory()}
            pagination={paginationFactory()}
            cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
          />
        </div>
      )}
    </ToolkitProvider>
  );
};

export default Table;
