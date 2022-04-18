import React,{useEffect,useState} from 'react'
import TableUser from './TableUser'
import './css/User.css'

const User = () => {
  return (
    <div className='user_page'>
      <TableUser />
    </div>
  );
}

export default User