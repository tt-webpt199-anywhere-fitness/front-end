import React, { useEffect, useState } from 'react'
import Course from './Course'

const CourseList = () => {
  const [coursees, setCoursees] = useState([])

  useEffect(() => {
    getCoursees()
  }, [])

  const getCoursees = () => {
    const axios = axiosWithAuth()
    axios.get('')
      .then(res => {
        console.log('getCoursees results', res)
        setCoursees(res.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className='coursees'>
        {
          coursees &&
          coursees.map((course, index) => {
            return <Course course={course} key={index} />
          })
        }
      </div>
    </div>
  )
}

export default CourseList
