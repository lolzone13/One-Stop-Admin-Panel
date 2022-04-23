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
import RoleSelect from "./RoleSelect";


const FoodItemsTable = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [foodItems, setFoodItems] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = React.useState('');
  const [veg, setVeg] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [waiting_time, setWaiting_time] = React.useState('');
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
            <GridToolbarColumnsButton style={{display:selectedRows.length==0?"":"none"}}/>
            <GridToolbarFilterButton style={{display:selectedRows.length==0?"":"none"}}/>
            {/* <GridToolbarDensitySelector /> */}
            <GridToolbarExport style={{display:selectedRows.length==0?"":"none"}}/>
            <DeleteOutlinedIcon style={{fontSize:"26px",display:selectedRows.length==0?"none":"",color:"#1976d2",marginLeft:"7.5px"}} onClick={()=>handleDelete(selectedRows)}/>
          </GridToolbarContainer>
        );
      }
      const rows = [
        {
          name: "Jash kalpes desai in the bioscience and bioengineering branch",
          emailid: "user1@.com",
          microsoftid: "user1@adjawgfaejgfgqighaeihefhaefjfga",
          role: ["user", "admin"],
          _id: "id1"
        },
        {
          name: "user2",
          emailid: "user2@.com",
          microsoftid: "user2@",
          role: ["user", "admin"],
          _id: "id2"
        },
        {
          name: "user3",
          emailid: "user3@.com",
          microsoftid: "user3@",
          role: ["user", "admin"],
          _id: "id3"
        }
      ];


      // const [selectedRows, setSelectedRows] = React.useState([]);
    
      const handleEdit = (event, cellValues) => {
        setName(cellValues.row.name);
        setIngredients(cellValues.row.ingredients);
        setVeg(cellValues.row.veg);
        setPrice(cellValues.row.price);
        setWaiting_time(cellValues.row.waiting_time);
      };
    
      const editFoodItems = async (_id) => {
        const response = await axios.put(
          `https://swc.iitg.ac.in/onestopapi/updateItem/${_id}`,
          {
            name,
            ingredients,
            veg,
            price,
            waiting_time,
          }
        );
        const new_response = await axios.get(
          `https://swc.iitg.ac.in/onestopapi/getAllItems`
        );
        setFoodItems(new_response.data);
      };
    
      const handleUpdate = (event, cellValues) => {
        editFoodItems(cellValues.row._id);
        setOpen(false);
      };
    
      const handleDelete = (event, cellValues) => {
        deleteFoodItems(cellValues.row._id);
      };
    
      const deleteFoodItems = async (_id) => {
        const response = await axios.delete(
          `https://swc.iitg.ac.in/onestopapi/deleteItem/${_id}`
        );
        if (response.status === 200) {
          setFoodItems(foodItems.filter((foodItem) => foodItem._id !== _id));
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
              'https://swc.iitg.ac.in/onestopapi/getAllItems'
            );
            console.log('hiiii', res.data);
            setFoodItems(res.data);
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
      }, []);
    
      const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            renderCell: renderCellExpand,
            sortable: false,
          },
          {
            field: 'ingredients',
            headerName: 'Ingredients',
            width: 300,
            renderCell: renderCellExpand,
            sortable: false,
          },
          {
            field: 'veg',
            headerName: 'Vegetarian',
            width: 150,
            renderCell: renderCellExpand,
            sortable: false,
          },
          {
            field: 'price',
            headerName: 'Price',
            width: 100,
            renderCell: renderCellExpand,
            sortable: false,
          },
          {
            field: 'waiting_time',
            headerName: 'Waiting Time',
            width: 200,
            renderCell: renderCellExpand,
            sortable: false,
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
          field: "Edit",
          sortable: false,
          width: 40,
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
                      label='Ingredients'
                      variant='outlined'
                      defaultValue={ingredients}
                      onChange={(event) => setIngredients(event.target.value)}
                    />
                  </form>
                  <br />
                  <form noValidate autoComplete='off'>
                    <TextField
                      id='outlined-basic'
                      label='Vegetarian'
                      defaultValue={veg}
                      variant='outlined'
                      onChange={(event) => setVeg(event.target.value)}
                    />
                  </form>
                  <br />
                  <form noValidate autoComplete='off'>
                    <TextField
                      id='outlined-basic'
                      label='Price'
                      defaultValue={price}
                      variant='outlined'
                      onChange={(event) => setPrice(event.target.value)}
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
         <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // columns={[...columns, { field: 'name', sortable: false }, { field: 'emailid', sortable: false }, { field: 'microsoftid', sortable: false }, { field: 'role', sortable: false }, { field: 'Edit', sortable: false }]}
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

export default FoodItemsTable