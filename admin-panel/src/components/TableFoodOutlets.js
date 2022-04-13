import React,{useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Link} from 'react-router-dom'

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'caption', headerName: 'Caption', width: 250 },
  {
    field: 'closing_time',
    headerName: 'Closing_time',
   
    width: 102,
  },
  {
    field: 'waiting_time',
    headerName: 'Waiting_time',
   
    width: 102,
  },
  {
    field: 'phone_number',
    headerName: 'Phone_number',
   
    width: 116,
  },
  {
    field: 'tags',
    headerName: 'Tags',
   
    width: 250,
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
          <button 
          // onClick={() => Delete(params.getValue(params.id, "id"))}
          >
            Edit
          </button>
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
  { id: 10, name: 'Snow white and the seven dwarfs , iron fist vfevvva', caption: 'Jon', closing_time: "10:00AM", waiting_time: '10:00AM', phone_number: '1234567890', tags: 'awdbfwadbfbfkjbfkuawfgkugfufgkuefgakdfgawfgqeywfgawekufgkuwfgqwukfgwugfukfgkquwegfqkwhfg' },
  { id: 20, name: 'Lannister', caption: 'Cersei', closing_time: "10:00AM", waiting_time: '10:00AM', phone_number: '1234567890', tags: ''},
  { id: 3, name: 'Lannister', caption: 'Jaime',closing_time: "10:00AM", waiting_time: '10:00AM', phone_number: '1234567890', tags: '' },
  { id: 4, name: 'Stark', caption: 'Arya',closing_time: "10:00AM", waiting_time: '10:00AM', phone_number: '1234567890', tags: '' },
  { id: 5, name: 'Targaryen', caption: 'Daenerys', closing_time: "10:00AM", waiting_time: '10:00AM', phone_number: '1234567890', tags: ''},
  { id: 6, name: 'Melisandre', caption: null,closing_time: "10:00AM", waiting_time: '10:00AM', phone_number: '1234567890', tags: '' },
  { id: 7, name: 'Clifford', caption: 'Ferrara', closing_time: "10:00AM", waiting_time: '10:00AM', phone_number: '1234567890', tags: ''},
  { id: 8, name: 'Frances', caption: 'Rossini',closing_time: "10:00AM", waiting_time: '10:00AM', phone_number: '1234567890', tags: '' },
  { id: 9, name: 'Roxie', caption: 'Harvey', closing_time: "10:00AM", waiting_time: '10:00AM', phone_number: '1234567890', tags: ''},
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
        options={{
    selectableRows: false // <===== will turn off checkboxes in rows
  }}
        checkboxSelection
       
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