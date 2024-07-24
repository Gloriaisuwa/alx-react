import React from 'react';
import './Notifications.css';
import { getLatestNotification } from '../utils/utils';
import closeIcon from '../assets/close-icon.png';

const Notifications = () => {
  return (
    <div className='Notifications'>
      <p>Here is the list of notifications</p>
      <button
        style={{
          background: 'none',
          border: 'none',
          position: 'absolute',
          right: '1.8rem',
          top: '2rem',
          cursor: 'pointer',
        }}
        aria-label='Close'
        onClick={() => console.log('Close button has been clicked')}
      >
        <img src={closeIcon} alt='closeIcon' width='18px' />
      </button>
      <ul>
        <li data='default'>New course available</li>
        <li data='urgent'>New resume available</li>
        <li
          data='urgent'
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
        ></li>
      </ul>
    </div>
  );
};

export default Notifications;
