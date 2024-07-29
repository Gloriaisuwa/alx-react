import React from 'react';
import './Notifications.css';
import { getLatestNotification } from '../utils/utils';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';

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
        <NotificationItem type='default' value='New course available' />
        <NotificationItem type='urgent' value='New resume available' />
        <NotificationItem type='urgent' html={getLatestNotification()} />
      </ul>
    </div>
  );
};

export default Notifications;
