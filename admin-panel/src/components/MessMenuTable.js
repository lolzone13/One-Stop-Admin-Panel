import React from 'react';

import "./css/MessMenu.css"
import { DataGrid } from '@mui/x-data-grid';



const columns = [
    {
        field: 'id', headerName: 'ID', width: 50,
        
    },
    {
        field: 'hostel', headerName: 'Hostel', width: 200,
        
    },
    {
        field: 'type', headerName: 'Type', width: 130,
        
    },
    {
        field: 'timing', headerName: 'Timing', width: 200,
        
    },
    {
        field: 'monday',
        headerName: 'Monday',
        width: 100,
        renderCell: (params) => {
            const content = params.value.map((val) => <li key={val.id}> {val} </li>);
            return <div>
                {content}
            </div>
        },
        
    },
    {
        field: 'tuesday',
        headerName: 'Tuesday',
        width: 100,
        renderCell: (params) => {
            const content = params.value.map((val) => <li key={val.id}> {val} </li>);
            return <div>
                {content}
            </div>
        },
        
    },
    {
        field: 'wednesday',
        headerName: 'Wednesday',
        width: 100,
        renderCell: (params) => {
            const content = params.value.map((val) => <li key={val.id}> {val} </li>);
            return <div>
                {content}
            </div>
        },
        
    },
    {
        field: 'thursday',
        headerName: 'Thursday',
        width: 100,
        renderCell: (params) => {
            const content = params.value.map((val) => <li key={val.id}> {val} </li>);
            return <div>
                {content}
            </div>
        },
        
    },
    {
        field: 'friday',
        headerName: 'Friday',
        width: 100,
        renderCell: (params) => {
            const content = params.value.map((val) => <li key={val.id}> {val} </li>);
            return <div>
                {content}
            </div>
        },
        
    },
    {
        field: 'saturday',
        headerName: 'Saturday',
        width: 100,
        renderCell: (params) => {
            const content = params.value.map((val) => <li key={val.id}> {val} </li>);
            return <div>
                {content}
            </div>
        },
        
    },
    {
        field: 'sunday',
        headerName: 'Sunday',
        width: 100,
        renderCell: (params) => {
            const content = params.value.map((val) => <li key={val.id}> {val} </li>);
            return <div>
                {content}
            </div>
        },
        
    },



];

const rows = [
    { id: 1, hostel: 'Brahmaputra', type: 'Breakfast', timing: '7:30AM - 10:30AM', monday: ['eggs', 'milk'], tuesday: ['eggs', 'milk'], wednesday: ['eggs', 'milk'], thursday: ['eggs', 'milk'], friday: ['eggs', 'milk'], saturday: ['eggs', 'milk'], sunday: ['eggs', 'milk'] },
    { id: 2, hostel: 'Brahmaputra', type: 'Lunch', timing: '12:00PM - 2:30PM', monday: ['roti', 'subzi'], tuesday: ['roti', 'subzi'], wednesday: ['roti', 'subzi'], thursday: ['roti', 'subzi'], friday: ['roti', 'subzi'], saturday: ['roti', 'subzi'], sunday: ['roti', 'subzi'] },

];

function DataTable() {



    return (
        <div style={{ marginTop: '5%', marginLeft: '10%', height: 400, width: '100%' }}>
            <DataGrid

                rowHeight={104}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection

            />

        </div>
    );
}


export default DataTable;