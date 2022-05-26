import React,{useEffect,useState} from 'react'

import './css/User.css'
import UserTable from './UserTable'

const User = () => {
  return (
    <>
      <div className='user_page'>
      {/* <TableUser /> */}
      <div className="user_table">
      <UserTable />
      </div>
    </div>
    
    </>
  );
}

export default User