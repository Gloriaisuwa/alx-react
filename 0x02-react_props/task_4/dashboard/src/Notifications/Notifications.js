import React from 'react';
import './Notifications.css';
import { getLatestNotification } from '../utils/utils';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';

const Notifications = ({ displayDrawer }) => {
  return (
    <div className='notification-wrapper'>
      <div className='menuItem'>
        <p>Your notifications</p>
      </div>
      {displayDrawer && (
        <div className='Notifications'>
          <p>Here is the list of notifications</p>
          <button
            style={{
              background: 'none',
              border: 'none',
              position: 'absolute',
              right: '.8rem',
              top: '1rem',
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
      )}
    </div>
  );
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
};

Notifications.defaultProps = {
  displayDrawer: false,
};

export default Notifications;
