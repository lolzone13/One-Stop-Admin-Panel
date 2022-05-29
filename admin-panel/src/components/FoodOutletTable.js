import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import axios from 'axios';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import RoleSelect from './RoleSelect';

const FoodOutletTable = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [foodOutlets, setFoodOutlets] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');
  const [waiting_time, setWaiting_time] = React.useState('');
  const [closing_time, setClosing_time] = React.useState('');
  const [phone_number, setPhone_number] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [menu, setMenu] = React.useState([]);
  const [address, setAddress] = React.useState('');
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');
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
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
          setShowFullCell(false);
        }
      }

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);

    return (
      <Box
        ref={wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          alignItems: 'center',
          lineHeight: '24px',
          width: 1,
          height: 1,
          position: 'relative',
          display: 'flex',
        }}
      >
        <Box
          ref={cellDiv}
          sx={{
            height: 1,
            width,
            display: 'block',
            position: 'absolute',
            top: 0,
          }}
        />
        <Box
          ref={cellValue}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
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
                variant='body2'
                style={{ padding: 8, wordWrap: 'break-word' }}
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
    width: PropTypes.number.isRequired,
  };

  function renderCellExpand(params) {
    return (
      <GridCellExpand
        value={params.value || ''}
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
    value: PropTypes.string,
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton
          style={{ display: selectedRows.length === 0 ? '' : 'none' }}
        />
        <GridToolbarFilterButton
          style={{ display: selectedRows.length === 0 ? '' : 'none' }}
        />
        {/* <GridToolbarDensitySelector /> */}
        <GridToolbarExport
          style={{ display: selectedRows.length === 0 ? '' : 'none' }}
        />
        <DeleteOutlinedIcon
          style={{
            fontSize: '26px',
            display: selectedRows.length === 0 ? 'none' : '',
            color: '#1976d2',
            marginLeft: '7.5px',
          }}
          onClick={() => deleteFoodOutlets(selectedRows)}
        />
      </GridToolbarContainer>
    );
  }

  const handleEdit = (event, cellValues) => {
    setName(cellValues.row.name);
    setCaption(cellValues.row.caption);
    setWaiting_time(cellValues.row.waiting_time);
    setClosing_time(cellValues.row.closing_time);
    setPhone_number(cellValues.row.phone_number);
    setTags(cellValues.row.tags);
    setMenu(cellValues.row.menu);
    setAddress(cellValues.row.address);
    setLatitude(cellValues.row.latitude);
    setLongitude(cellValues.row.longitude);
  };

  const handleUpdate = (event, cellValues) => {
    editFoodOutlets(cellValues.row._id);
    setOpen(false);
  };

  const editFoodOutlets = async (_id) => {
    console.log({
      name,
      caption,
      waiting_time,
      closing_time,
      phone_number,
      tags,
      menu,
      address,
      latitude,
      longitude
    });
    const response = await axios.put(
      `https://swc.iitg.ac.in/onestopapi/updateOutlet/${_id}`,
      {
        name,
        caption,
        waiting_time,
        closing_time,
        phone_number,
        tags,
        menu,
        address,
        latitude,
        longitude
      }
    );
    console.log(response.data);
    const new_response = await axios.get(
      `https://swc.iitg.ac.in/onestopapi/getAllOutlets`
    );
    setFoodOutlets(new_response.data);
    console.log(new_response, "hello");
  };

  const deleteFoodOutlets = async (ids) => {
    console.log({ id: ids });
    const response = await axios.delete(
      `https://swc.iitg.ac.in/onestopapi/deletemanyoutlets/`,
      { data: { id: ids } },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (response.status === 200) {
      let res = foodOutlets.filter(
        (foodOutlet) => !ids.includes(foodOutlet._id)
      );
      console.log(res);
      setFoodOutlets(res);
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
          'https://swc.iitg.ac.in/onestopapi/getAllOutlets'
        );
        // let newData = res.data;
        // const menuItems = [];
        // res.data.menu.forEach((item) => menuItems.push(item.name));
        // newData.menu = menuItems;
        setFoodOutlets(res.data);
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchData();
  }, []);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: 'caption',
      headerName: 'Caption',
      width: 300,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: 'waiting_time',
      headerName: 'Waiting Time',
      width: 150,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: 'closing_time',
      headerName: 'Closing Time',
      width: 150,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      width: 150,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 150,
      renderCell: renderCellExpand,
      sortable: false,
    },

    {
      field: 'address',
      headerName: 'Address',
      width: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: 'latitude',
      headerName: 'Latitude',
      width: 150,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: 'longitude',
      headerName: 'Longitude',
      width: 150,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: 'menu',
      headerName: 'Menu',
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const content = params.value.map((val) => (
          <li key={val.id}> {val.name} </li>
        ));
        return <div>{content}</div>;
      },
      
    },
    {
      field: 'Edit',
      sortable: false,
      width: 40,
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
                  Edit Food Outlet
                </Typography>
                <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                  <div
                    style={{
                      display: 'flex',
                      width: '50rem',
                      justifyContent: 'space-between',
                    }}
                  >
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Name'
                        variant='outlined'
                        defaultValue={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Caption'
                        variant='outlined'
                        defaultValue={caption}
                        onChange={(event) => setCaption(event.target.value)}
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Waiting Time'
                        defaultValue={waiting_time}
                        variant='outlined'
                        onChange={(event) =>
                          setWaiting_time(event.target.value)
                        }
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Closing Time'
                        defaultValue={closing_time}
                        variant='outlined'
                        onChange={(event) =>
                          setClosing_time(event.target.value)
                        }
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Phone Number'
                        defaultValue={phone_number}
                        variant='outlined'
                        onChange={(event) =>
                          setPhone_number(event.target.value)
                        }
                      />
                    </form>
                  </div>
                  <br />
                  <div style={{ display: 'flex', flex: 'wrap' }}>
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Tags'
                        defaultValue={tags}
                        variant='outlined'
                        onChange={(event) => setTags(event.target.value)}
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Address'
                        defaultValue={address}
                        variant='outlined'
                        onChange={(event) => setAddress(event.target.value)}
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Latitude'
                        defaultValue={latitude}
                        variant='outlined'
                        onChange={(event) => setLatitude(event.target.value)}
                      />
                    </form>
                    <br />
                    <form noValidate autoComplete='off'>
                      <TextField
                        id='outlined-basic'
                        label='Longitude'
                        defaultValue={longitude}
                        variant='outlined'
                        onChange={(event) => setLongitude(event.target.value)}
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
  console.log(selectedRows);


  return (
    <>
      <div
        style={{
          height: 400,
          width: '100%',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        <DataGrid
          rows={foodOutlets}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
          checkboxSelection
          disableColumnMenu
          getRowId={(row) => row._id}
          disableSelectionOnClick
          getRowHeight={(val) => {
            //console.log(val);
            return Math.max(52, val.model.menu.length * 26);
          }}

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
    </>
  );
};

export default FoodOutletTable;
