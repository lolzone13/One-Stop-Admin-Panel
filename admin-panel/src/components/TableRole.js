import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const handleClick = () => {

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




function EditDelete() {


  const [open, setOpen] = React.useState(false);
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
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>


            <form noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </form>




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
  { field: 'col1', headerName: 'Column 1', width: 80, renderCell: renderCellExpand },
  {
    field: 'col2',
    headerName: 'Column 2',
    width: 100,
    renderCell: renderCellExpand,
  },
  {
    field: 'col3',
    headerName: 'Column 3',
    width: 150,
    renderCell: renderCellExpand,
  },
  {
    field: "actions",
    headerName: "Actions",
    minWidth: 150,
    flex: 0.3,
    type: "number",
    sortable: false,
    renderCell: EditDelete,
  },
];

const rows = [
  {
    id: 1,
    col1: 'Hello',
    col2: 'World',
    col3: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used.',
  },
  {
    id: 2,
    col1: 'DataGridPro',
    col2: 'is Awesome',
    col3: 'In publishing and graphic design, Lorem ipsum is a placeholder text or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
  },
  {
    id: 3,
    col1: 'MUI',
    col2: 'is Amazing',
    col3: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
  },
  {
    id: 4,
    col1: 'Hello',
    col2: 'World',
    col3: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form.',
  },
  {
    id: 5,
    col1: 'DataGridPro',
    col2: 'is Awesome',
    col3: 'Typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
  },
  {
    id: 6,
    col1: 'MUI',
    col2: 'is Amazing',
    col3: 'Lorem ipsum may be used as a placeholder before final copy is available.',
  },
];

export default function RenderExpandCellGrid() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns}
        disableSelectionOnClick
      />
    </div>
  );
}