import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <>
      <p>Login to access the full dashboard</p>
      <form>
        <label htmlFor='email-add'>Email:</label>
        <input type='email' name='email-add'></input>
        <label htmlFor='psw'>Password:</label>
        <input type='password' name='psw'></input>
        <button>OK</button>
      </form>
    </>
  );
};

export default Login;
