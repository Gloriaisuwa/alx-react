import React from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils';

const Footer = () => {
  return (
    <div className='App-footer'>
      Copyright {getFullYear()} - {getFooterCopy()}
    </div>
  );
};

export default Footer;
