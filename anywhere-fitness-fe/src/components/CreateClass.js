import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialCourseValues = {
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

export default function CreateCourse(props) {
  const [courses, setCourses] = useState({})
  const [course, setCourse] = useState(initialCourseValues)
  const userId = localStorage.getItem('id')
  const history = useHistory()
  
  useEffect(() => {
    getCourses()
  })
  
  const getCourses = () => {
    const axios = axiosWithAuth()
    axios.get(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/users/${userId}/courses`)
      .then(res => {
        console.log(courses)
        console.log('getCourses results', res)
        setCourses(res.data)
      })
      .catch(err => console.log(err))
  }

  const addCourse = (e) => {
    e.preventDefault()
    console.log(course)
    const loc_id = Number(course.location_id)
    setCourse({
      ...course,
      location_id: loc_id
    })
    console.log(course)
    const axios = axiosWithAuth()
    axios.post(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/courses`, course)
      .then(res => {
        console.log(res)
        history.push('/create')
        history.push('/profile')
      })
  }

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
      user_id: Number(userId)
    })
  }

  return (
    <div className="form-container">
      <h3>Add a class</h3>
			<form className="classCreate" onSubmit={addCourse}>
				<div className="inputs">
        <label>Class Name:</label>
          <input 
            type="text" 
            name="class_name" 
            value={course.class_name}
            onChange={handleChange}
            />
        </div>
        <div className="inputs">
        <label>Class Type:</label>
          <input 
            type="text" 
            name="class_type" 
            value={course.class_type}
            onChange={handleChange}
            />
        </div>
        <div className="inputs">
        <label>Start Time:</label>
          <input 
            type="datetime-local" 
            name="class_start" 
            value={course.class_start}
            onChange={handleChange}
            />
        </div>
        <div className="inputs">
        <label>Duration:</label>
          <input 
            type="text" 
            name="class_duration" 
            value={course.class_duration}
            onChange={handleChange}
            />
        </div>
        <div className="inputs">
        <label>Intensity Level:</label>
          <input 
            type="number" 
            name="class_intensity" 
            min="1" 
            max="5" 
            value={course.class_intensity}
            onChange={handleChange}
            />
        </div>
        <div className="inputs">
        <label>Location:</label>
          <input 
            type="text" 
            name="location_id" 
            value={course.location_id}
            onChange={handleChange}
            />
        </div>
        <div className="inputs">
        <label>Maximum Class Size:</label>
          <input 
            type="number" 
            min='1' 
            name="class_max" 
            value={course.class_max}
            onChange={handleChange}
            />
        </div>
        <button 
          name="class_create"
					className="edit-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
