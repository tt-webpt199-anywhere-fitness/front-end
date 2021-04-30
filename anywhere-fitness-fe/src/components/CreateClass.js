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
  }, [])
  
  const getCourses = () => {
    const axios = axiosWithAuth()
    axios.get(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/users/${userId}/courses`)
      .then(res => {
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
    <div className="addCourse">
      <h3>Add a class</h3>
      <form className="classCreate" onSubmit={addCourse}>
        <label>
          Class Name:
          <input 
            type="text" 
            name="class_name" 
            value={course.class_name}
            onChange={handleChange}
            />
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
        <button name="class_create">Submit</button>
      </form>
    </div>
  );
}
