import React, { Component } from 'react';
import './Header.css';
import Logo from '../assets/holberton-logo.jpg';

export default function Header() {
  return (
    <div className='App-header'>
      <img src={Logo} className='App-logo' alt='logo' />
      <h1>School dashboard</h1>
    </div>
  );
}
