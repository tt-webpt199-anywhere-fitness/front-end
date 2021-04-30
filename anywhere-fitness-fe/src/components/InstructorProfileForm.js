import React, { useEffect, useState } from "react";
import Course from "./Course";
import axiosWithAuth from "../utils/axiosWithAuth";
import CreateCourse from "./CreateClass";

export default function InstructorProfile(props) {
  const userId = Number(localStorage.getItem('id'))
  const [userData, setUserData] = useState({})
  const [courses, setCourses] = useState([{}])

  const getUserData = () => {
    const axios = axiosWithAuth()
    axios.get(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/users/${userId}`)
      .then(res => {
        console.log(res)
        setUserData(res.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getUserData()
  })

  const getUserCourses = () => {
    const axios = axiosWithAuth()
    axios.get(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/users/${userId}/courses`)
      .then(res => {
        console.log('getUserCourses results', res)
        setCourses(res.data)
        console.log(courses)
      })
      .catch(err => console.log(err))
  }
  
  useEffect(() => {
    getUserCourses()
  })

  return (
    <div className='instructorProfilePage'>
      <h2>Hello, {userData.username}!</h2>
      <CreateCourse />
      <div className="instructorCourses">
        <h2>List of Classes</h2>
        {
          courses &&
          courses.map((course, index) => {
            return <Course course={course} key={index} />;
        })
        }
        {/* should display the instructor's courses */}
      </div>
    </div>
  );
}
