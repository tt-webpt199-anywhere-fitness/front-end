import React from "react";

const Course = (props) => {
  const { course } = props;

  const ColoredLine = ({ color }) => {
    return <hr style={{ borderColor: color }} />;
  };

  return (
    <div className="course-container">
      <h3>{course.course}</h3>
      <p>Type: {course.course_type}</p>
      <p>Start Time: {course.start}</p>
      <p>Duration: {course.duration}</p>
      <p>Intensity Level: {course.intensity}</p>
      <p>Location: {course.location}</p>
      <p>Current Registered Attendees: {course.enrolled}</p>
      <p>Max Class Size: {course.course_max}</p>
      <ColoredLine color="orangered" />
    </div>
  );
};

export default Course;
