import React from 'react';
import TableFoodItems from './TableFoodItems.js';
import UploadFiles from './UploadFiles';
import './css/FoodItems.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FoodItems = () => {
  return (
    <>
      <div className='fooditems_page'>
        <div className='fooditems_page_button1'>
          <span>SELECT THE CSV </span>
          <UploadFiles
            fileType='.csv'
            url='https://swc.iitg.ac.in/onestopapi/createItem'
          />
        </div>
        <div className='fooditems_page_table'>
          <TableFoodItems />
        </div>
      </div>
    </>
  );
};

export default FoodItems;
