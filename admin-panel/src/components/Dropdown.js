import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';


const schema = [
  {
    section: 'Departments',
    subsection: ['Chemical Engineering', 'Civil Engineering', 'Computer Science and Engineering', 'Electrical Engineering', 'Electronics and Communication Engineering', 'Mechanical Engineering'],
  },
  {
    section: 'IITG Administration',
    subsection: ['Director Office', 'Deputy Director Office'],
  },
]

const Dropdown = (props) => {


  const [section, setSection] = React.useState('');


  const handleChange = (event) => {
    setSection(event.target.value);
    props.setSelection(event.target.value);

  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Section</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            // value={}
            label='Sections'
            onChange={handleChange}
          >
            {props.data.map((section) => (
              <MenuItem value={section}>{section}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default Dropdown;
