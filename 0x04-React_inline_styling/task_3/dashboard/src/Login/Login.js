import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const Login = () => {
  return (
    <>
      <p>Login to access the full dashboard</p>
      <form className={css(styles['label-input'])}>
        <div>
          <label htmlFor='email-add'>Email:</label>
          <input
            type='email'
            name='email-add'
            className={css(styles.input)}
          ></input>
        </div>
        <div>
          <label htmlFor='psw'>Password:</label>
          <input
            type='password'
            name='psw'
            className={css(styles.input)}
          ></input>
        </div>
        <button type='submit'>OK</button>
      </form>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: '0.7rem',
  },

  'label-input': {
    '@media (min-width: 768px)': {
      display: 'flex',
      alignItems: 'center',
    },
  },
});

export default Login;
