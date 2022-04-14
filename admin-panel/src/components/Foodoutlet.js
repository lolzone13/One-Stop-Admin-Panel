import React from 'react'
import TableFoodoutlet from './TableFoodoutlet'
import UploadFiles from './UploadFiles'
import "./css/Foodoutlet.css"

const Foodoutlet = () => {
  return (
  <>
    <div className='foodoutlet_page'>
        <div className='foodoutlet_page_button1'>
        <span>SELECT THE CSV </span>
      <UploadFiles />
        </div>
        <div className='foodoutlet_page_table'>
        <TableFoodoutlet />
        </div>
      </div>

  </>
  )
}

export default Foodoutlet