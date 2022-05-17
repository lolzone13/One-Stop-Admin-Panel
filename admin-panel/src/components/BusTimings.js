import React from 'react'
import "./css/Timings.css"
import UploadFiles from "./UploadFiles"


const BusTimings = () => {
  return (
   <>
      <div className='timings_page'>
     <div className='timings_page_button1'>
     <span>SELECT THE CSV</span>
      <UploadFiles fileType='.csv' url='${process.env.REACT_APP_BASE_URL}`+`createbustiming'/>
     </div>
      </div>
   </>
  )
}

export default BusTimings