import React from 'react';
import TableFoodItems from './TableFoodItems.js';
import UploadFiles from './UploadFiles';
import "./css/FoodItems.css";

const FoodItems = () => {
  return (
    <>
      <div className='fooditems_page'>
        <div className='fooditems_page_button1'>
        <span>SELECT THE CSV </span>
      <UploadFiles fileType='.csv' url='https://one-stop-api.herokuapp.com/createItem'/>
        </div>
        <div className='fooditems_page_table'>
        <TableFoodItems/>
        </div>
      </div>
    </>
  );
};

export default FoodItems;
