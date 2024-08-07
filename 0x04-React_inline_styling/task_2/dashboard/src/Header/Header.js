import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Logo from '../assets/holberton-logo.jpg';

const Header = () => {
  return (
    <div className={css(styles['App-header'])}>
      <img src={Logo} className={css(styles['App-logo'])} alt='logo' />
      <h1>School dashboard</h1>
    </div>
  );
};

const styles = StyleSheet.create({
  'App-header': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.25rem',
    color: '#e0364b',
    padding: '1.2rem 0 0.3rem 0',
    borderBottom: '4px solid #e0364b',
  },

  'App-logo': {
    width: '200px',
    height: '200px',
  },
});

export default Header;
