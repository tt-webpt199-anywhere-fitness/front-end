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
  const userId = localStorage.getItem('id')

  const { user, userCourses, change } = props;
  const [userData, setUserData] = useState(initialFormValues)
  const [updatedData, setUpdatedData] = useState({})
  console.log(userData)
  console.log(props)
  console.log(updatedData)

  useEffect(() => {
    getProfile()
  }, [])

  const update = (name, value) => {
    setUpdatedData({...userData, [name]: value})
  }

  useEffect (() => {
    const axios = axiosWithAuth()
    axios.get(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/user`)
    .then((res) => {
      console.log(res)
      const currentUser = res.data.filter(
        (user) => user.id === Number(userId)
      );
      console.log(currentUser[0]);
      setUpdatedData({
        ...userData,
        username: currentUser[0].username
      });
    })
    .catch((err) =>
      console.error(`unable to get user data`, err.message)
    )
  }, [userId])

  
  console.log(updatedData)

  const onChange = (evt) => {
    const { name, value } = evt.target;
    update(name, value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const submit = () => {
    axiosWithAuth()
      .put(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/user${userId}`, updatedData)
      .then((res) => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      {!props.editing ? (
        <div>
          <h2>
            {props.user} 
          </h2>
          <button onClick={updateProfile}>Edit Profile</button>
        </div>
      ) : (
    <div className="userProfilePage">
      <form className="userProfile" onSubmit={onSubmit}>
        <label>
          Name:
          <label>
            First:
            <input
              type="text"
              name="first_name"
              value={userData.first_name}
              onChange={onChange}
            />
          </label>
          <label>
            Last:
            <input
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={onChange}
            />
          </label>
          <label>
            Birthday:
            <input
              type="date"
              name="user_birthday"
              value={userData.birthday}
              onChange={onChange}
            />
          </label>
          <button name="user_edit">Edit</button>
          {/* edit button should allow user to edit information */}
          <button name="user_submit" disabled>
            Submit
          </button>
          {/* submit button should be disabled unless the user clicks edit*/}
        </label>
      </form>
      <div className="userCourses">
        <h2>Registered Classes</h2>
        {/* {userCourses.map((course) => {
          return <Course course={course} />;
        })} */}

        {/* Should display course that the user in registered for */}
      </div>
    </div>
    )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.user
  }
}

export default connect(mapStateToProps, { updateProfile}) (UserProfile);
