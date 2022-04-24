import React,{useEffect,useState} from 'react'

import './css/User.css'
import UserTable from './UserTable'

const User = () => {
  return (
    <>
      <div className='user_page'>
      {/* <TableUser /> */}
      <UserTable />
    </div>
    
    </>
  );
}

export default User