import React from 'react';
import axios from 'axios';
import './css/MessMenu.css';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { flexbox } from '@mui/system';

function DataTable() {
  const [messMenu, setMessMenu] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [hostel, setHostel] = React.useState('');
  const [type, setType] = React.useState('');
  const [timing, setTiming] = React.useState('');
  const [monday, setMonday] = React.useState('');
  const [tuesday, setTuesday] = React.useState('');
  const [wednesday, setWednesday] = React.useState('');
  const [thursday, setThursday] = React.useState('');
  const [friday, setFriday] = React.useState('');
  const [saturday, setSaturday] = React.useState('');
  const [sunday, setSunday] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleEdit = (event, cellValues) => {
    setHostel(cellValues.row.hostel);
    setType(cellValues.row.type);
    setTiming(cellValues.row.timing);
    setMonday(cellValues.row.monday);
    setTuesday(cellValues.row.tuesday);
    setWednesday(cellValues.row.wednesday);
    setThursday(cellValues.row.thursday);
    setFriday(cellValues.row.friday);
    setSaturday(cellValues.row.saturday);
    setSunday(cellValues.row.sunday);
  };

  const editMessMenu = async (_id) => {
    const response = await axios.put(
      `https://swc.iitg.ac.in/onestopapi/updatemessmenu/${_id}`,
      {
        hostel,
        type,
        timing,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      }
    );
    const new_response = await axios.get(
      `https://swc.iitg.ac.in/onestopapi/getmessmenu`
    );
    setMessMenu(new_response.data);
  };

  const handleUpdate = (event, cellValues) => {
    editMessMenu(cellValues.row._id);
    setOpen(false);
  };

  const handleDelete = (event, cellValues) => {
    deleteMessMenu(cellValues.row._id);
  };

  const deleteMessMenu = async (_id) => {
    const response = await axios.delete(
      `https://swc.iitg.ac.in/onestopapi/deletemessmenu/${_id}`
    );
    if (response.status === 200) {
      setMessMenu(messMenu.filter((messmenuitem) => messmenuitem._id !== _id));
    }
  };

  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          'https://swc.iitg.ac.in/onestopapi/getmessmenu'
        );
        console.log('hiiii', res.data);
        setMessMenu(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
    },
    {
      field: 'hostel',
      headerName: 'Hostel',
      width: 200,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 130,
    },
    {
      field: 'timing',
      headerName: 'Timing',
      width: 200,
    },
    {
      field: 'monday',
      headerName: 'Monday',
      width: 100,
      renderCell: (params) => {
        const content = params.value.map((val) => (
          <li key={val.id}> {val} </li>
        ));
        return <div>{content}</div>;
      },
    },
    {
      field: 'tuesday',
      headerName: 'Tuesday',
      width: 100,
      renderCell: (params) => {
        const content = params.value.map((val) => (
          <li key={val.id}> {val} </li>
        ));
        return <div>{content}</div>;
      },
    },
    {
      field: 'wednesday',
      headerName: 'Wednesday',
      width: 100,
      renderCell: (params) => {
        const content = params.value.map((val) => (
          <li key={val.id}> {val} </li>
        ));
        return <div>{content}</div>;
      },
    },
    {
      field: 'thursday',
      headerName: 'Thursday',
      width: 100,
      renderCell: (params) => {
        const content = params.value.map((val) => (
          <li key={val.id}> {val} </li>
        ));
        return <div>{content}</div>;
      },
    },
    {
      field: 'friday',
      headerName: 'Friday',
      width: 100,
      renderCell: (params) => {
        const content = params.value.map((val) => (
          <li key={val.id}> {val} </li>
        ));
        return <div>{content}</div>;
      },
    },
    {
      field: 'saturday',
      headerName: 'Saturday',
      width: 100,
      renderCell: (params) => {
        const content = params.value.map((val) => (
          <li key={val.id}> {val} </li>
        ));
        return <div>{content}</div>;
      },
    },
    {
      field: 'sunday',
      headerName: 'Sunday',
      width: 100,
      renderCell: (params) => {
        const content = params.value.map((val) => (
          <li key={val.id}> {val} </li>
        ));
        return <div>{content}</div>;
      },
    },
    {
      field: 'Edit',
      renderCell: (cellValues) => {
        return (
          <>
            <EditIcon
              onClick={(event) => {
                setOpen(true);
                handleEdit(event, cellValues);
              }}
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  Text in a modal
                </Typography>
                <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                  <div style={{display:'flex', width:'50rem', justifyContent:'space-between'}}>
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Hostel'
                        variant='outlined'
                        defaultValue={hostel}
                        onChange={(event) => setHostel(event.target.value)}
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Type'
                        variant='outlined'
                        defaultValue={type}
                        onChange={(event) => setType(event.target.value)}
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Timing'
                        defaultValue={timing}
                        variant='outlined'
                        onChange={(event) => setTiming(event.target.value)}
                      />
                    </form>
                  </div>

                  <br />
                  <div style={{ display: 'flex', flex: 'wrap' }}>
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Monday'
                        defaultValue={monday}
                        variant='outlined'
                        onChange={(event) => setMonday(event.target.value)}
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Tuesday'
                        defaultValue={tuesday}
                        variant='outlined'
                        onChange={(event) => setTuesday(event.target.value)}
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Wednesday'
                        defaultValue={wednesday}
                        variant='outlined'
                        onChange={(event) => setWednesday(event.target.value)}
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Thursday'
                        defaultValue={thursday}
                        variant='outlined'
                        onChange={(event) => setThursday(event.target.value)}
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Friday'
                        defaultValue={friday}
                        variant='outlined'
                        onChange={(event) => setFriday(event.target.value)}
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Saturday'
                        defaultValue={saturday}
                        variant='outlined'
                        onChange={(event) => setSaturday(event.target.value)}
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Sunday'
                        defaultValue={sunday}
                        variant='outlined'
                        onChange={(event) => setSunday(event.target.value)}
                      />
                    </form>
                  </div>

                  <br />
                  <Button
                    onClick={(event) => {
                      handleUpdate(event, cellValues);
                    }}
                    type='submit'
                    variant='contained'
                  >
                    Edit
                  </Button>
                </Typography>
              </Box>
            </Modal>
          </>
        );
      },
    },
    {
      field: 'delete',
      width: 50,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return (
          <DeleteOutlinedIcon
            onClick={() => {
              console.log(selectedRows);
            }}
          />
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      hostel: 'Brahmaputra',
      type: 'Breakfast',
      timing: '7:30AM - 10:30AM',
      monday: ['eggs', 'milk'],
      tuesday: ['eggs', 'milk'],
      wednesday: ['eggs', 'milk'],
      thursday: ['eggs', 'milk'],
      friday: ['eggs', 'milk'],
      saturday: ['eggs', 'milk'],
      sunday: ['eggs', 'milk'],
    },
    {
      id: 2,
      hostel: 'Brahmaputra',
      type: 'Lunch',
      timing: '12:00PM - 2:30PM',
      monday: ['roti', 'subzi'],
      tuesday: ['roti', 'subzi'],
      wednesday: ['roti', 'subzi'],
      thursday: ['roti', 'subzi'],
      friday: ['roti', 'subzi'],
      saturday: ['roti', 'subzi'],
      sunday: ['roti', 'subzi'],
    },
  ];

  return (
    <div
      style={{ marginTop: '5%', marginLeft: '10%', height: 400, width: '100%' }}
    >
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
