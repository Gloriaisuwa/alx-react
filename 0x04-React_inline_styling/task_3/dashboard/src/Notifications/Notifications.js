import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.listNotifications.length > this.props.listNotifications.length
    );
  }
  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }
  render() {
    const { displayDrawer, listNotifications } = this.props;

    return (
      <div className={css(styles['notification-wrapper'])}>
        <div className={css(styles.menuItem)}>
          <p>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className={css(styles.Notifications)}>
            <ul>
              {listNotifications?.length ? (
                <>
                  <p>Here is the list of notifications</p>
                  {listNotifications.map(({ id, html, type, value }) => (
                    <NotificationItem
                      key={id}
                      type={type}
                      value={value}
                      html={html}
                      id={id}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </>
              ) : (
                <li data-notification-type='default'>
                  No new notification for now
                </li>
              )}
            </ul>
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
          </div>
        )}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  'notification-wrapper': {
    position: 'absolute',
    right: '1rem',
    margin: '1.4rem',
    '@media (max-width: 568px)': {
      width: '100%',
      margin: '0',
    },
  },

  Notifications: {
    position: 'relative',
    padding: '1rem',
    border: '1px dashed #e0364b',
    '@media (max-width: 568px)': {
      fontSize: '20px',
      position: 'absolute',
      top: '0',
      height: '100vh',
      width: '100%',
      padding: '0',
      border: 'none',
      background: '#fff',
    },
  },

  menuItem: {
    display: 'flex',
    justifyContent: 'end',
    paddingBottom: '0.3rem',
  },
});

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

export default Notifications;
