import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UploadFiles from './UploadFiles.js';
import "./css/MessMenu.css"
import DataTable from './MessMenuTable.js';

const MessMenu = () => {
    const [hostel, setHostel] = React.useState('');

    const handleChange = (event) => {
        setHostel(event.target.value);
    };
    return (
      <div className='messmenu_page'>
        <span style={{ 'margin-left': 640 }}>SELECT THE CSV</span>
        <UploadFiles
          fileType='.csv'
          url='https://swc.iitg.ac.in/onestopapi/createmessmenu'
        />
        {/* <span style={{ "position": "relative", "margin-left": 575, "top": 60, "font-size": 30}}>Choose the hostel</span> */}
        <div className='messmenu_page_button1'>
          <span>SELECT THE CSV</span>
          <UploadFiles
            fileType='.csv'
            url='https://swc.iitg.ac.in/onestopapi/createmessmenu'
          />
        </div>
        <div className='messmenu_page_button2'>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Hostel</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                // value={}
                label='Hostels'
                onChange={handleChange}
              >
                <MenuItem value={'Brahmaputra'}>Brahmaputra</MenuItem>
                <MenuItem value={'Lohit'}>Lohit</MenuItem>
                <MenuItem value={'Siang'}>Siang</MenuItem>
                <MenuItem value={'Disang'}>Disang</MenuItem>
                <MenuItem value={'Dibang'}>Dibang</MenuItem>
                <MenuItem value={'Kapili'}>Kapili</MenuItem>
                <MenuItem value={'Manas'}>Manas</MenuItem>
                <MenuItem value={'Barak'}>Barak</MenuItem>
                <MenuItem value={'Kameng'}>Kameng</MenuItem>
                <MenuItem value={'Umiam'}>Umiam</MenuItem>
                <MenuItem value={'Dhansiri'}>Dhansiri</MenuItem>
                <MenuItem value={'Subansiri'}>Subansiri</MenuItem>
                <MenuItem value={"Married Scholar's Hostel"}>
                  Married Scholar's Hostel
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className='messmenu_page_table'>
          <DataTable />
        </div>
      </div>
    );
}




export default MessMenu;