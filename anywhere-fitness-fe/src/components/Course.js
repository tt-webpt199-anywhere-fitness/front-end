import React, { useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import axiosWithAuth from '../utils/axiosWithAuth'
import { updateCourse } from '../actions';

const Course = (props) => {
  const { course } = props
  const history = useHistory()
  const [editedCourse, setEditedCourse] = useState({})
  const userId = localStorage.getItem('id')
  const [editing, setEditing] = useState()
  console.log(props)

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
  
  const getCourseToEdit = (e) => {
    const course_id = e.target.value
    const axios = axiosWithAuth()
    axios.get(`/courses/${course_id}`)
      .then(res => {
        console.log('getCourseToEdit results', res)
        setEditedCourse(res.data)
        toggleEditing()
      })
      .catch(err => console.log(err))
  }
  
  const toggleEditing = () => {
	  console.log('editing enabled?')
    setEditing(true)
  }

  const handleChange = (e) => {
    setEditedCourse({
      ...course,
      [e.target.name]: e.target.value,
      user_id: Number(userId)
    })
  }

  return (
    <div>
      {!editing ? ( 
        <div>
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
              <button value={course.id} onClick={getCourseToEdit}>Edit</button>
              <button value={course.id} onClick={deleteSelectedCourse}>Delete</button>
            </div>
            ) : <> </>
          }
        </div> ) : ( 
        <div className="addCourse">
        <h3>Add a class</h3>
        <form className="classCreate" >
          <label>
            Class Name:
            <input 
              type="text" 
              name="class_name" 
              value={editedCourse.class_name}
              placeholder={editedCourse.class_name}
              onChange={handleChange}
              >
                {editedCourse.class_name}
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
              type="text" 
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
          <button name="class_create" onClick={updateCourse, toggleEditing}>Submit</button>
        </form>
      </div>
      )}
      <hr />
    </div>
  )
}

export default Course

