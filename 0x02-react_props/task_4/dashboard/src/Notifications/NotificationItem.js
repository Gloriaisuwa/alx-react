import React from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';

function NotificationItem({ type, html, value }) {
  return (
    <>
      {type && value ? <li data-notification-type={type}>{value}</li> : null}
      {html ? (
        <li
          data-notification-type={type}
          dangerouslySetInnerHTML={{ __html: html }}
        ></li>
      ) : null}
    </>
  );
}

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  __html: PropTypes.shape({
    html: PropTypes.string,
  }),
};

NotificationItem.defaultProps = {
  type: 'default',
};

export default NotificationItem;
