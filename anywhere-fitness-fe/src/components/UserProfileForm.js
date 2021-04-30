import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axiosWithAuth from "../utils/axiosWithAuth";
import Course from "./Course";
import { toggleEditing, updateProfile } from '../actions'
import { getProfile } from '../actions'
import axios from "axios";

const initialFormValues = {
  username: '',
  password: ''
}

const UserProfile = props => {
  const userId = Number(localStorage.getItem('id'))
  console.log(userId)

  const [userData, setUserData] = useState()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getUserCourses()
  }, [])
  
  const getUserCourses = () => {
    const axios = axiosWithAuth()
    axios.get(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/courses/${userId}`)
      .then(res => {
        console.log('getUserCourses results', res)
        setCourses(res.data)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="userProfilePage">
      <div className="userProfile">
        {/* <h2>{props.user.username}</h2> */}
      </div>
      <div className="userCourses">
        <h2>Registered Classes</h2>
         {
          courses &&
          courses.map((course, index) => {
            return <Course course={course} key={index} />
          })
        }

        {/* Should display course that the user in registered for */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.user
  }
}

export default connect(mapStateToProps, { updateProfile}) (UserProfile);
