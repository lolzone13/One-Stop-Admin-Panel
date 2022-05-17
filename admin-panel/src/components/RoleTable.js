import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import axios from "axios";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector
} from "@mui/x-data-grid";



const RoleTable = () => {
    const [roles, setRoles] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [role, setRole] = React.useState('');
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
            <DeleteOutlinedIcon style={{fontSize:"26px",display:selectedRows.length===0?"none":"",color:"#1976d2",marginLeft:"7.5px"}} onClick={()=>deleteRoles(selectedRows)}/>
          </GridToolbarContainer>
        );
      }
      const rows = [
      {role: "Admin", _id: 1},
        {role: "User", _id: 2},
        {role: "User", _id: 3},
      ];


    
   
    
   
    const handleEdit = (event, cellValues) => {
        setRole(cellValues.row.role);
      };
    
      const editRoles = async (_id) => {
        console.log(role);
        // const response = await axios.put(
        //   `${process.env.REACT_APP_BASE_URL}`+`updateRole/${_id}`,
        //   {
        //     role,
        //   }
        // );
        // const new_response = await axios.get(
        //   `${process.env.REACT_APP_BASE_URL}`+`getAllRoles`
        // );
        // setRoles(new_response.data);
      };
    
      const handleUpdate = (event, cellValues) => {
        editRoles(cellValues.row._id);
        setOpen(false);
      };
    

    
      const deleteRoles = async (ids) => {
        // const response = await axios.delete(
        //   `${process.env.REACT_APP_BASE_URL}`+`deleteRole/${_id}`
        // );
        // if (response.status === 200) {
          let res = rows.filter(role => !ids.includes(role._id));
          console.log(res);
          // setRoles(
          //   roles.filter((role) => role._id !== _id)
          // );
        // }
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
              `${process.env.REACT_APP_BASE_URL}`+`getAllRoles`
            );
            console.log('Hello', res.data);
            setRoles(res.data);
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
      }, []);
      const columns = [
        {
            field: 'role',
            headerName: 'Roles',
            width: 400,
            renderCell: renderCellExpand,
            sortable: false,
          },
    
    
        {
          field: "Edit",
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
                      Text in a modal
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                      <form noValidate autoComplete='off'>
                        <TextField
                          id='outlined-basic'
                          label='Role'
                          variant='outlined'
                          defaultValue={role}
                          onChange={(event) => setRole(event.target.value)}
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
          }
        }
      ];
      console.log(selectedRows);

    



    
  return (
    <>
         <div style={{ height: 400, width: "50%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
       
        components={{
          Toolbar: CustomToolbar
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
    </>
  )
}

export default RoleTable