import React from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';

class NotificationItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { html, id, markAsRead, type, value } = this.props;
    return (
      <div>
        {type && value ? (
          <li data-notification-type={type} onClick={() => markAsRead(id)}>
            {value}
          </li>
        ) : null}
        {html ? (
          <li
            data-notification-type={type}
            dangerouslySetInnerHTML={{ __html: html }}
            onClick={() => markAsRead(id)}
          ></li>
        ) : null}
      </div>
    );
  }
}

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  __html: PropTypes.shape({
    html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
  id: PropTypes.number,
};

NotificationItem.defaultProps = {
  type: 'default',
  markAsRead: () => {
    console.log('empty func');
  },
  id: 0,
};

export default NotificationItem;
