import React from 'react';
import './css/Login.css';

const Login = () => {
  return (
    <>
      <div class='login-wrapper'>
        <div class='inputs'>
          <input placeholder='Enter your email' class='gmail' />
          <input placeholder='Enter your password' class='password' />
          <button class='login-btn'>Login</button>
        </div>
        <div class='microsoft'>
          <div class='divider'>
            <span>or log in with</span>
          </div>
          <button>
            <img src='https://app.specterx.com/assets/icons/microsoft-i.png' />
            Microsoft
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
