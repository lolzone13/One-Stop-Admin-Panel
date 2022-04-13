import React,{useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Link} from 'react-router-dom'

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'CollegeToCity_WorkingDay', headerName: 'CollegeToCity_WorkingDay', width: 250 },
  { field: 'CityToCollege_WorkingDay', headerName: 'CityToCollege_WorkingDay', width: 250 },
  {
    field: 'CollegeToCity_Holiday',
    headerName: 'CollegeToCity_Holiday',
   
    width: 250,
  },
  {
    field: 'CityToCollege_Holiday',
    headerName: 'CityToCollege_Holiday',
   
    width: 250,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: "actions",
    headerName: "Actions",
    minWidth: 150,
    flex: 0.3,
    type: "number",
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
            Edit
          </Link>
          <button 
          // onClick={() => Delete(params.getValue(params.id, "id"))}
          >
            Delete
          </button>
        </>
      );
    },
  },

];

const rows = [
  { id: 10, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 20, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
  const [selectedRows, setSelectedRows] =useState([]);


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
       
        // onSelectionModelChange={(ids) => {
        //   const selectedIDs = new Set(ids);
        //   const selectedRows = rows.filter((row) =>
        //     selectedIDs.has(row.id),
        //   );

        //   setSelectedRows(selectedRows);
        // }}
      />
    </div>
  );
}