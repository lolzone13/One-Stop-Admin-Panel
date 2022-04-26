import React from 'react';

import UploadFiles from './UploadFiles';
import "./css/FoodItems.css";
import FoodItemsTable from './FoodItemsTable.js';

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
        {/* <TableFoodItems/> */}
        <FoodItemsTable/>
        </div>
      </div>
    </>
  );
};

export default FoodItems;
