import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import TableRole from './TableRole';
import './css/Role.css';

const Role = () => {
  const [role, setRole] = useState('');
  const handleUpdate = async (e) => {
    try {
      const response = await axios.post(
        'https://one-stop-api.herokuapp.com/createRole',
        {
          role: role,
        }
      );
      console.log(response);
      setRole('');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className='role_page'>
        <TableRole />
        <div className='role_page_add'>
          <form noValidate autoComplete='off'>
            <TextField
              id='outlined-basic'
              label='Role'
              variant='outlined'
              onChange={(event) => setRole(event.target.value)}
            />
          </form>
          <Button
            onClick={(event) => {
              handleUpdate(event);
            }}
            type='submit'
            variant='contained'
          >
            Add
          </Button>
        </div>
      </div>
    </>
  );
};

export default Role;
