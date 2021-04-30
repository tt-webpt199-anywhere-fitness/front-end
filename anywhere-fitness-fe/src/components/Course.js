import React, { useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import axiosWithAuth from '../utils/axiosWithAuth'
// import { updateCourse } from '../actions';

const initialEditedCourse = {
  class_name: "",
  class_type: "",
  class_start: "",
  class_duration: "",
  class_intensity: 1,
  class_enrolled: 0,
  class_max: 10,
  location_id: 1,
  user_id: ""

}

const Course = (props) => {
  const { course } = props
  const history = useHistory()
  const [editedCourse, setEditedCourse] = useState(initialEditedCourse)
  const userId = localStorage.getItem('id')
  const [editing, setEditing] = useState()

  const userRole = localStorage.getItem('role')
  const profilePage = useRouteMatch("/profile")

  const deleteSelectedCourse = (e) => {
    const course_id = e.target.value
    console.log(course_id)
    axiosWithAuth()
			.delete(`/courses/${course_id}`)
			.then((res) => {
				console.log(res)
        history.push('/classes')
        history.push('/profile')
			})
			.catch((err) => 
			console.log(err)
			)
  }

  const ColoredLine = ({ color }) => {
    return <hr style={{ borderColor: color }} />;
  };
  
  // const getCourseToEdit = (e) => {
  //   const course_id = e.target.value
  //   const axios = axiosWithAuth()
  //   axios.get(`/courses/${course_id}`)
  //     .then(res => {
  //       console.log('getCourseToEdit results', res)
  //       setEditedCourse(res.data)
  //       toggleEditing()
  //     })
  //     .catch(err => console.log(err))
  // }
  const editedCourseId = props.course.id

  const toggleEditing = (e) => {
    setEditing(!editing)
  }

  const handleChange = (e) => {
    if (e.target.type === 'number') {setEditedCourse({
      ...editedCourse,
      [e.target.name]: Number(e.target.value),
      user_id: Number(userId)
    }) } else (
      setEditedCourse({
        ...editedCourse,
        [e.target.name]: e.target.value,
        user_id: Number(userId)
      })
    )
  }

  // const handleUpdateSubmit = (e) => {
  //   e.preventDefault()
  //   const loc_id = Number(editedCourse.location_id)
  //   setEditedCourse({
  //     ...editedCourse,
  //     location_id: Number(loc_id)
  //   })
  //   console.log(editedCourse)
  //   updateCourse(editedCourse) 
  //   toggleEditing()
  // }

  const updateEditedCourse = (e) => {
    const course = {
      ...editedCourse,
      class_name: editedCourse.class_name,
      class_type: editedCourse.class_type,
      class_start: editedCourse.class_start,
      class_duration: editedCourse.class_duration,
      class_intensity: editedCourse.class_intensity,
      class_enrolled: editedCourse.class_enrolled,
      class_max: editedCourse.class_max,
      location_id: editedCourse.location_id,
      user_id: editedCourse.user_id
    }    
    const id = editedCourseId
    console.log('course and id for edit', course, id)
    e.preventDefault()
		axiosWithAuth()
			.put(`/courses/${id}`, course)
			.then((res) => {
				console.log('updateCourse res', res)
        history.push('/')
        history.push('/profile')
			})
			.catch((err) => {
				console.log('updateCourse err', err)
			})
  }

  return (
    <div>
      {!editing ? ( 
        <div className="course-container">
        <h3>{course.course}</h3>
        <h4>Instructor: {course.instructor}</h4>
        <p>Type: {course.course_type}</p>
        <p>Start Time: {course.start}</p>
        <p>Duration: {course.duration}</p>
        <p>Intensity Level: {course.intensity}</p>
        <p>Location: {course.address}</p>
        <p>Current Registered Attendees: {course.enrolled}</p>
        <p>Max Class Size: {course.course_max}</p>
          {
            userRole === 'Instructor' && profilePage ? (
            <div>
              <button value={course.id} onClick={toggleEditing}>Edit</button>
              <button value={course.id} onClick={deleteSelectedCourse}>Delete</button>
            </div>
            ) : <> </>
          }
        <ColoredLine color="orangered" />
        </div> ) : ( 
        <div className="addCourse">
        <h3>Edit class</h3>
        <form className="classCreate" >
          <label>
            Class Name:
            <input 
              type="text" 
              name="class_name" 
              value={course.class_name}
              onChange={handleChange}
              >
              </input>
          </label>
          <label>
            Class Type:
            <input 
              type="text" 
              name="class_type" 
              value={course.class_type}
              onChange={handleChange}
              />
          </label>
          <label>
            Start Time:
            <input 
              type="datetime-local" 
              name="class_start" 
              value={course.class_start}
              onChange={handleChange}
              />
          </label>
          <label>
            Duration:
            <input 
              type="text" 
              name="class_duration" 
              value={course.class_duration}
              onChange={handleChange}
              />
          </label>
          <label>
            Intensity Level:
            <input 
              type="number" 
              name="class_intensity" 
              min="1" 
              max="5" 
              value={course.class_intensity}
              onChange={handleChange}
              />
          </label>
          <label>
            Location:
            <input 
              type="number" 
              name="location_id" 
              value={course.location_id}
              onChange={handleChange}
              />
          </label>
          <label>
            Maximum Class Size:
            <input 
              type="number" 
              min='1' 
              name="class_max" 
              value={course.class_max}
              onChange={handleChange}
              />
          </label>
          <button type='button' name="class_create" onClick={updateEditedCourse}>Submit</button>
        </form>
      </div>
      )}
    </div>
  );
};

export default Course;
