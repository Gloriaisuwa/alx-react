import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const Login = () => {
  return (
    <>
      <p>Login to access the full dashboard</p>
      <form>
        <label htmlFor='email-add'>Email:</label>
        <input
          type='email'
          name='email-add'
          className={css(styles.input)}
        ></input>
        <label htmlFor='psw'>Password:</label>
        <input type='password' name='psw' className={css(styles.input)}></input>
        <button>OK</button>
      </form>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: '0.7rem',
  },
});

export default Login;
