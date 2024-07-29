import React from 'react';
import './CourseList.css';
import CourseListRow from './CourseListRow';

const CourseListRowHead = [
  { cellOne: 'Available courses', cellTwo: null, isHeader: true },
  { cellOne: 'Course name', cellTwo: 'Credit', isHeader: true },
];

const CourseListRowBody = [
  { cellOne: 'ES6', cellTwo: '60', isHeader: false },
  { cellOne: 'Webpack', cellTwo: '20', isHeader: false },
  { cellOne: 'React', cellTwo: '40', isHeader: false },
];

const CourseList = () => {
  return (
    <table id='CourseList'>
      <thead>
        {CourseListRowHead.map((course, idx) => (
          <CourseListRow
            key={idx}
            textFirstCell={course.cellOne}
            textSecondCell={course.cellTwo}
            isHeader={course.isHeader}
          />
        ))}
      </thead>
      <tbody>
        {CourseListRowBody.map((course, idx) => (
          <CourseListRow
            key={idx}
            textFirstCell={course.cellOne}
            textSecondCell={course.cellTwo}
            isHeader={course.isHeader}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CourseList;
