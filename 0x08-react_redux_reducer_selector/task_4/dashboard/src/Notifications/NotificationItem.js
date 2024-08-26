import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class NotificationItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { html, id, markAsRead, type, value } = this.props;
    const selectColor = type === 'urgent' ? styles.urgent : styles.default;
    return (
      <div>
        {type && value ? (
          <li
            data-notification-type={type}
            className={css(selectColor, styles.li)}
            onClick={() => markAsRead(id)}
          >
            {value}
          </li>
        ) : null}
        {html ? (
          <li
            data-notification-type={type}
            dangerouslySetInnerHTML={{ __html: html }}
            className={css(selectColor, styles.li)}
            onClick={() => markAsRead(id)}
          ></li>
        ) : null}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  default: {
    color: 'blue',
  },

  urgent: {
    color: 'red',
  },

  li: {
    '@media (max-width: 568px)': {
      fontSize: '20px',
      borderBottom: '2px solid #000',
      padding: '10px 8px',
    },
  },
});

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
