import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const CourseListRow = ({ isHeader, textFirstCell, textSecondCell }) => {
  const rowStyle = {
    backgroundColor: '#f5f5f5ab',
  };

  const headerStyle = {
    backgroundColor: '#deb5b545',
  };

  return (
    <tr style={isHeader ? headerStyle : rowStyle}>
      {isHeader ? (
        textSecondCell === null ? (
          <th colSpan={2} className={css(styles.th, styles.colspanTwo)}>
            {textFirstCell}
          </th>
        ) : (
          <>
            <th className={css(styles.th)}>{textFirstCell}</th>
            <th className={css(styles.th)}>{textSecondCell}</th>
          </>
        )
      ) : (
        <>
          <td className={css(styles.td)}>{textFirstCell}</td>
          <td className={css(styles.td)}>{textSecondCell}</td>
        </>
      )}
    </tr>
  );
};

const styles = StyleSheet.create({
  CourseList: {
    width: '100%',
    marginTop: '0.6rem',
    border: '1px solid #e8e8e8',
    borderCollapse: 'collapse',
  },

  colspanTwo: {
    textAlign: 'center',
  },

  th: {
    textAlign: 'left',
    borderBottom: '1px solid #e8e8e8',
    padding: '0.5rem',
  },

  td: {
    padding: '0.5rem',
  },
});

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CourseListRow;
