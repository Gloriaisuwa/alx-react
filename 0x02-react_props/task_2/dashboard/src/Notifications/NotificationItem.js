import React from 'react';
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

export default NotificationItem;
