import React from 'react';
import axios from 'axios';
import './css/MessMenu.css';
// import { DataGrid } from '@mui/x-data-grid';
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
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector
} from "@mui/x-data-grid";

function DataTable(props) {

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

  function isOverflown(element) {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }

  const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);
  
    const handleMouseEnter = () => {
      const isCurrentlyOverflown = isOverflown(cellValue.current);
      setShowPopper(isCurrentlyOverflown);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    };
  
    const handleMouseLeave = () => {
      setShowFullCell(false);
    };
  
    React.useEffect(() => {
      if (!showFullCell) {
        return undefined;
      }
  
      function handleKeyDown(nativeEvent) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
        if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
          setShowFullCell(false);
        }
      }
  
      document.addEventListener("keydown", handleKeyDown);
  
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);
  
    return (
      <Box
        ref={wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          alignItems: "center",
          lineHeight: "24px",
          width: 1,
          height: 1,
          position: "relative",
          display: "flex"
        }}
      >
        <Box
          ref={cellDiv}
          sx={{
            height: 1,
            width,
            display: "block",
            position: "absolute",
            top: 0
          }}
        />
        <Box
          ref={cellValue}
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {value}
        </Box>
        {showPopper && (
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
            style={{ width, marginLeft: -1 }}
          >
            <Paper
              elevation={3}
              style={{ minHeight: wrapper.current.offsetHeight - 3 }}
            >
              <Typography
                variant="body2"
                style={{ padding: 8, wordWrap: "break-word" }}
              >
                {value}
              </Typography>
            </Paper>
          </Popper>
        )}
      </Box>
    );
  });
  
  GridCellExpand.propTypes = {
    value: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
  };
  
  function renderCellExpand(params) {
    return (
      <GridCellExpand
        value={params.value || ""}
        width={params.colDef.computedWidth}
      />
    );
  }
  
  renderCellExpand.propTypes = {
    /**
     * The column of the row that the current cell belongs to.
     */
    colDef: PropTypes.object.isRequired,
    /**
     * The cell value, but if the column has valueGetter, use getValue.
     */
    value: PropTypes.string
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton style={{display:selectedRows.length===0?"":"none"}}/>
        <GridToolbarFilterButton style={{display:selectedRows.length===0?"":"none"}}/>
        {/* <GridToolbarDensitySelector /> */}
        <GridToolbarExport style={{display:selectedRows.length===0?"":"none"}}/>
        <DeleteOutlinedIcon style={{fontSize:"26px",display:selectedRows.length===0?"none":"",color:"#1976d2",marginLeft:"7.5px"}} onClick={()=>deleteMessMenu(selectedRows)}/>
      </GridToolbarContainer>
    );
  }

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
      `https://swc.iitg.ac.in/onestopapi/all_menuItems`
    );
    setMessMenu(new_response.data);
  };

  const handleUpdate = (event, cellValues) => {
    editMessMenu(cellValues.row._id);
    setOpen(false);
  };

  // const handleDelete = (event, cellValues) => {
  //   deleteMessMenu(cellValues.row._id);
  // };

  // const deleteMessMenu = async (_id) => {
  //   const response = await axios.delete(
  //     `https://swc.iitg.ac.in/onestopapi/deletemessmenu/${_id}`
  //   );
  //   if (response.status === 200) {
  //     setMessMenu(messMenu.filter((messmenuitem) => messmenuitem._id !== _id));
  //   }
  // };
  const deleteMessMenu = async (ids) => {
    const response = await axios.delete(
      `https://swc.iitg.ac.in/onestopapi/deletemessmenu/, `,
      { data: { id: ids } },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (response.status === 200) {
      let res = rows.filter((mess) => !ids.includes(mess._id));
      console.log(res);
      setMessMenu(res);
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
          'https://swc.iitg.ac.in/onestopapi/all_menuItems'
        );

        //const finalData = res.data.filter(itemVal => itemVal.hostel.toUpperCase() === props.data.toUpperCase());
        
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
      renderCell: renderCellExpand,
            sortable: false,
    },
    {
      field: 'hostel',
      headerName: 'Hostel',
      width: 200,
      renderCell: renderCellExpand,
            sortable: false,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 130,
      renderCell: renderCellExpand,
            sortable: false,
    },
    {
      field: 'timing',
      headerName: 'Timing',
      width: 200,
      renderCell: renderCellExpand,
            sortable: false,
    },
    {
      field: 'monday',
      headerName: 'Monday',
      sortable: false,
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
      sortable: false,
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
      sortable: false,
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
      sortable: false,
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
      sortable: false,
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
      sortable: false,
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
      sortable: false,
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
      sortable: false,
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
                  Edit Mess Menu
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
  ];

  const rows = [
    {
      _id: 1,
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
      _id: 2,
      hostel: 'Lohit',
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
    <div style={{ height: 400, width: '100%', marginTop: '2rem', marginBottom: '1rem' }}>

      <DataGrid
        rows={messMenu.filter(itemVal => itemVal.hostel.toUpperCase() === props.data.toUpperCase())}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
        checkboxSelection
        disableColumnMenu
        getRowId={(row) => row._id}
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);

          let selectrows = [];
          selectedIDs.forEach(function (value) {
            selectrows.push(value);
          });
          setSelectedRows(selectrows);
        }}
      />
    </div>
  );
}

export default DataTable;
