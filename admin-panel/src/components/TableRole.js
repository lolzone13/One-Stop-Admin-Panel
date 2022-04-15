import React,{useState} from 'react';
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
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
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
            <Typography variant="body2" style={{ padding: 8 }}>
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
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
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




function EditCommand() {


  const [open, setOpen] = React.useState(false);
  const [role,setRole]=React.useState('');
  const handleOpen = () => setOpen(true);
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

  return (
    <>
      <Button
      onClick={handleOpen}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Role
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>


            <form noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Role" variant="outlined" onChange={(event)=>setRole(event.target.value)}/>
            </form>
           
            <Button type="submit" variant="contained" > 
                
                Edit
                </ Button>


          </Typography>
        </Box>
      </Modal>
      <Button
      // onClick={() => Delete(params.getValue(params.id, "id"))}
      >
        Delete
      </Button>
    </>
  );
}

const columns = [
  { field: 'role', headerName: 'Role', width: 200, renderCell: renderCellExpand },
 
  {
    field: "actions",
    headerName: "Actions",
    minWidth: 150,
    flex: 0.3,
    type: "number",
    sortable: false,
    renderCell: EditCommand,
  },
];



export default function RenderExpandCellGrid() {
  const [roles, setRoles] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('https://swc.iitg.ac.in/onestopapi/getAllRoles');
        console.log("Hello", res.data);
        setRoles(res.data);
        
  
      } catch (error) {
        console.log(error);
      }

    }
    fetchData();
    
  }, []);
  console.log("Roles", roles);
  return (
    <div style={{ height: 400, width: '50%' }}>
      <DataGrid rows={roles} columns={columns}
        disableSelectionOnClick
getRowId={(row) => row._id}
      />
    </div>
  );
}