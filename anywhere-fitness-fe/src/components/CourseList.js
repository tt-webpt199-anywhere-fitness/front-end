import React, { useEffect, useState } from 'react'
import Course from './Course'
import axiosWithAuth from '../utils/axiosWithAuth'
import { connect } from 'react-redux';
import { updateCourse } from '../actions'

const CourseList = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getCourses()
  }, [])

  const getCourses = () => {
    const axios = axiosWithAuth()
    axios.get(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/courses`)
      .then(res => {
        console.log('getCourses results', res)
        setCourses(res.data)
      })
      .catch(err => console.log(err))
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

const mapStateToProps = state => {
  return {
    editing: state.course.editing,
    course: state.course.course
  }
}

export default connect(mapStateToProps, { updateCourse })(CourseList);
