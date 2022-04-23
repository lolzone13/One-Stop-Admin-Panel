import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

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
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant='body2' style={{ padding: 8 }}>
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

export default function RenderExpandCellGrid() {
  const [foodOutlets, setFoodOutlets] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');
  const [waiting_time, setWaiting_time] = React.useState('');
  const [closing_time, setClosing_time] = React.useState('');
  const [phone_number, setPhone_number] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [menu, setMenu] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleEdit = (event, cellValues) => {
    setName(cellValues.row.name);
    setCaption(cellValues.row.caption);
    setWaiting_time(cellValues.row.waiting_time);
    setClosing_time(cellValues.row.closing_time);
    setPhone_number(cellValues.row.phone_number);
    setTags(cellValues.row.tags);
    setMenu(cellValues.row.menu);
  };

  const editFoodOutlets = async (_id) => {
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
      }
    );
    const new_response = await axios.get(
      `https://swc.iitg.ac.in/onestopapi/getAllRoles`
    );
    setFoodOutlets(new_response.data);
  };

  const handleUpdate = (event, cellValues) => {
    editFoodOutlets(cellValues.row._id);
    setOpen(false);
  };

  const handleDelete = (event, cellValues) => {
    deleteFoodOutlets(cellValues.row._id);
  };

  const deleteFoodOutlets = async (_id) => {
    const response = await axios.delete(
      `https://swc.iitg.ac.in/onestopapi/deleteOutlet/${_id}`
    );
    if (response.status === 200) {
      setFoodOutlets(
        foodOutlets.filter((foodOutlet) => foodOutlet._id !== _id)
      );
    }
  };

  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
        console.log(res.data);
        setFoodOutlets(res.data);
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchData();
  }, []);
  const foodOutletRows = [
    {
      name: "McDonalds",
      caption: "kuch bhi",
      waiting_time: "30 mins",
      closing_time: "10:00 PM",
      phone_number: 890329037,
      tags: ["hello", "these"],
      menu: ["foo", "bar"]
    }
  ]
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: renderCellExpand,
    },
    {
      field: 'caption',
      headerName: 'Caption',
      width: 300,
      renderCell: renderCellExpand,
    },
    {
      field: 'waiting_time',
      headerName: 'Waiting Time',
      width: 150,
      renderCell: renderCellExpand,
    },
    {
      field: 'closing_time',
      headerName: 'Closing Time',
      width: 150,
      renderCell: renderCellExpand,
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      width: 150,
      renderCell: renderCellExpand,
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 150,
      renderCell: renderCellExpand,
    },
    {
      field: 'menu',
      headerName: 'Menu',
      width: 150,
      renderCell: renderCellExpand,
    },
    {
      field: 'Edit',
      renderCell: (cellValues) => {
        return (
          <>
            {/* <Button
              variant='contained'
              color='primary'
              onClick={(event) => {
                setOpen(true);
                handleEdit(event, cellValues);
              }}
            >
              Edit
            </Button> */}
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
                      onChange={(event) => setWaiting_time(event.target.value)}
                    />
                  </form>
                  <br />
                  <form noValidate autoComplete='off'>
                    <TextField
                      id='outlined-basic'
                      label='Closing Time'
                      defaultValue={closing_time}
                      variant='outlined'
                      onChange={(event) => setClosing_time(event.target.value)}
                    />
                  </form>
                  <br />
                  <form noValidate autoComplete='off'>
                    <TextField
                      id='outlined-basic'
                      label='Phone Number'
                      defaultValue={phone_number}
                      variant='outlined'
                      onChange={(event) => setPhone_number(event.target.value)}
                    />
                  </form>
                  <br />
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
                      label='Menu'
                      defaultValue={menu}
                      variant='outlined'
                      onChange={(event) => setMenu(event.target.value)}
                    />
                  </form>
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
      field: 'Delete',
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={foodOutlets}
        columns={columns}
        disableSelectionOnClick
        getRowId={(row) => row._id}
      />
    </div>
  );
}
