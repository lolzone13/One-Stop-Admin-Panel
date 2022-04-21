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
import axios from 'axios';
import RoleSelect from './RoleSelect';
import { IconButton} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';


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
  const [users, setUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [microsoftid, setMicrosoftid] = React.useState('');
  const [rolesselected, setRolesSelected] = React.useState([]);
  const [name, setName] = useState('');
  const [emailid, setEmailid] = useState('');
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleEdit = (event, cellValues) => {
    setName(cellValues.row.name);
    setEmailid(cellValues.row.emailid);
    setMicrosoftid(cellValues.row.microsoftid);
    setRolesSelected(cellValues.row.roles);
  };

  const editUser = async (_id) => {
    const response = await axios.put(
      `https://swc.iitg.ac.in/onestopapi/updateUser/${_id}`,{
        name,
        emailid,
        microsoftid,
        roles: rolesselected
      }
    );
    const new_response = await axios.get(
      `https://swc.iitg.ac.in/onestopapi/getAllUsers`
    );
    setUsers(new_response.data);
  }

  const handleUpdate = (event, cellValues) => {
    editUser(cellValues.row._id);
    setOpen(false);
  };

  const handleDelete = (event, cellValues) => {
    deleteUser(cellValues.row._id);
  };

  const deleteUser = async (_id) => {
    const response = await axios.delete(
      `https://swc.iitg.ac.in/onestopapi/deleteUser/${_id}`
    );
    if (response.status === 200) {
      setUsers(users.filter((user) => user._id !== _id));
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
          'https://swc.iitg.ac.in/onestopapi/getAllUsers'
        );
        console.log(res.data);
        setUsers(res.data);
      } catch (error) {
        console.log('error', error);
      }
    }
    fetchData();
  }, []);

  const usersnow=[
    {
      name:"user1",
      emailid:"user1@.com",
      microsoftid:"user1@",
      role:["user","admin"],
      _id:"id1"
    },
    {
      name:"user2",
      emailid:"user2@.com",
      microsoftid:"user2@",
      role:["user","admin"],
      _id:"id2"
    },
    {
      name:"user3",
      emailid:"user3@.com",
      microsoftid:"user3@",
      role:["user","admin"],
      _id:"id3"

    }
  ]

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 280,
      renderCell: renderCellExpand,
    },
    {
      field: 'microsoftid',
      headerName: ' Microsoft ID',
      width: 250,
      renderCell: renderCellExpand,
    },
    {
      field: 'emailid',
      headerName: 'Email ID',
      width: 250,
      renderCell: renderCellExpand,
    },
  
    {
      field: 'role',
      headerName: 'Role',
      width: 250,
      renderCell: renderCellExpand,
    },
    
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   minWidth: 150,
    //   flex: 0.3,
    //   type: "number",
    //   sortable: false,
    //   renderCell: EditCommand,
    // },
    {
      field: 'Edit',
      width:40,
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
                      label='Email ID'
                      variant='outlined'
                      defaultValue={emailid}
                      onChange={(event) => setEmailid(event.target.value)}
                    />
                  </form>
                  <br />
                  <form noValidate autoComplete='off'>
                    <TextField
                      id='outlined-basic'
                      label='Microsoft ID'
                      defaultValue={microsoftid}
                      variant='outlined'
                      onChange={(event) => setMicrosoftid(event.target.value)}
                    />
                  </form>
                  <br />
                  <RoleSelect setRolesSelected={setRolesSelected} />
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
      field: "delete",
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
      }
    },
  
  ];
  
  console.log(selectedRows);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={usersnow}
        columns={columns}
        disableSelectionOnClick
        checkboxSelection
        getRowId={(row) => row._id}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          
          let selectrows=[];
          selectedIDs.forEach(function(value) {
           selectrows.push(value);
          })
          setSelectedRows(selectrows);
    

          
        }}
      />
    </div>
  );
}
