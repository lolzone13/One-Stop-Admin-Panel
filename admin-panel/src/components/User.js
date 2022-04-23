import React,{useEffect,useState} from 'react'
import TableUser from './TableUser'
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