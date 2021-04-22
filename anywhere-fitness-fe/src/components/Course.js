import React from 'react'

const Course = (props) => {
  const { course } = props

  return (
    <div>
      <h3>{course.name}</h3>
      <p>Type: {course.type}</p>
      <p>Start Time: {course.start}</p>
      <p>Duration: {course.duration}</p>
      <p>Intensity Level: {course.intensityLevel}</p>
      <p>Location: {course.location}</p>
      <p>Current Registered Attendees: {course.attendees}</p>
      <p>Max Class Size: {course.size}</p>
      <hr />
    </div>
  )
}

export default Course
