import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { DataGrid } from '@mui/x-data-grid';
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
  const [contactsSubsection, setContactsSubsection] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);

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
          'https://swc.iitg.ac.in/onestopapi/getAllSubsections'
        );
        console.log('hiiii', res.data);
        setContactsSubsection(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const contactsSubsectionRow = [
    {
      subsection: 'Chemical Engineering',
      name: 'Dr. R.K. Sharma',
      phoneNumber: '9939472002',
      email: 'abc@gmail.com',
      _id: 'id1',
    },
    {
      subsection: 'Computer Science and Engineering',
      name: 'Dr. R.S. Khandelwal',
      phoneNumber: '9385085000',
      email: 'abcde@gmail.com',
      _id: 'id2',
    },
    {
      subsection: 'Civil Engineering',
      name: 'Dr. Y.K. Gupta',
      phoneNumber: '9457593759',
      email: 'ign@gmail.com',
      _id: 'id3',
    },
  ];
  const columns = [
    {
      field: 'subsection',
      headerName: 'Subsection',
      width: 300,
      renderCell: renderCellExpand,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
      renderCell: renderCellExpand,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 180,
      renderCell: renderCellExpand,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      renderCell: renderCellExpand,
    },
  ];

  return (
    <div style={{ height: 400, width: '70%' }}>
      <DataGrid
        rows={contactsSubsectionRow}
        columns={columns}
        disableSelectionOnClick
        getRowId={(row) => row._id}
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
