import React, { useEffect, useState } from 'react'
import Course from './Course'
import axiosWithAuth from '../utils/axiosWithAuth'

const CourseList = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getCourses()
  }, [])

  const getCourses = () => {
    const axios = axiosWithAuth()
    // axios.get('')
    //   .then(res => {
    //     console.log('getCourses results', res)
    //     setCourses(res.data)
    //   })
    //   .catch(err => console.log(err))
  }

  return (
    <div>
      <div className='courses'>
        {
          courses &&
          courses.map((course, index) => {
            return <Course course={course} key={index} />
          })
        }
      </div>
    </div>
  )
}

export default CourseList
