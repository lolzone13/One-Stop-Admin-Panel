import React from 'react'
import "./css/Timings.css"
import UploadFiles from "./UploadFiles"

const FerryTimings = () => {
  return (
    <div className='timings_page'>
     <div className='timings_page_button1'>
     <span>SELECT THE CSV</span>
      <UploadFiles fileType='.csv' url={`${process.env.REACT_APP_BASE_URL}`+`createferrytiming`}/>
     </div>
      </div>
  )
}

export default FerryTimings