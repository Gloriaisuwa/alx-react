import React from 'react';
import './CourseList.css';
import CourseListRow from './CourseListRow';

const CourseListRowHead = [
  { cellOne: 'Available courses', cellTwo: null, isHeader: true },
  { cellOne: 'Course name', cellTwo: 'Credit', isHeader: true },
];

const CourseList = ({ listCourses }) => {
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
        {listCourses?.length ? (
          listCourses.map(({ id, name, credit }) => (
            <CourseListRow
              key={id}
              textFirstCell={name}
              textSecondCell={credit}
            />
          ))
        ) : (
          <CourseListRow textFirstCell='No course available yet' />
        )}
      </tbody>
    </table>
  );
};

export default CourseList;
