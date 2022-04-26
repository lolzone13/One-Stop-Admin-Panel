import React from 'react'

import UploadFiles from './UploadFiles'
import "./css/Foodoutlet.css"
import FoodOutletTable from './FoodOutletTable'

const Foodoutlet = () => {
  return (
  <>
    <div className='foodoutlet_page'>
        <div className='foodoutlet_page_button1'>
        <span>SELECT THE CSV </span>
      <UploadFiles fileType='.csv' url='https://one-stop-api.herokuapp.com/createOutlet'/>
        </div>
        <div className='foodoutlet_page_table'>
        {/* <TableFoodoutlet /> */}
        <FoodOutletTable />
        </div>
      </div>

  </>
  )
}

export default Foodoutlet