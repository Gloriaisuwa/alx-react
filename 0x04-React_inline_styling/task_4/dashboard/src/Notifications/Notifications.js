import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: props.displayDrawer,
    };
    this.markAsRead = this.markAsRead.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.listNotifications.length >
        this.props.listNotifications.length ||
      nextState.displayDrawer !== this.state.displayDrawer
    );
  }
  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  handleMouseEnter() {
    setTimeout(() => {
      this.setState({ displayDrawer: true });
    }, 2000);
  }

  handleMouseLeave() {
    this.setState({ displayDrawer: false });
  }

  render() {
    const { listNotifications } = this.props;
    const { displayDrawer } = this.state;

    return (
      <div className={css(styles['notification-wrapper'])}>
        {!displayDrawer && (
          <div
            className={css(styles.menuItem)}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <p>Your notifications</p>
          </div>
        )}
        {displayDrawer && (
          <div
            className={css(styles.Notifications)}
            onMouseLeave={this.handleMouseLeave}
          >
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

const opacity = {
  '0%': { opacity: 0.5 },
  '100%': { opacity: 1 },
};

const bounce = {
  '0%': { transform: 'translateY(0px)' },
  '33%': { transform: 'translateY(-5px)' },
  '66%': { transform: 'translateY(5px)' },
  '100%': { transform: 'translateY(0px)' },
};

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
    ':hover': {
      cursor: 'pointer',
      animationName: [opacity, bounce],
      animationDuration: '1s, 0.5s',
      animationIterationCount: '3',
    },
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
