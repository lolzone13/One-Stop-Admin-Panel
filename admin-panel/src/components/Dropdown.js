import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Dropdown = (props) => {
  const [allSections, setAllSections] = React.useState(props.allSections);
  const [section, setSection] = React.useState('');

  const handleChange = (event) => {
    setSection(event.target.value);
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
            {allSections.map((section) => (
              <MenuItem value={section.section}>{section.section}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default Dropdown;
