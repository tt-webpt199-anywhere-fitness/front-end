import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axiosWithAuth from "../utils/axiosWithAuth";
import Course from "./Course";
import { toggleEditing, updateProfile } from '../actions/index'

const initialValues = {
  first_name: '',
  last_name: '',
  birthday: ''
}

const UserProfile = (props) => {
  const { user, userCourses, change, submit } = props;
  const [userData, setUserData] = useState(initialValues)
  const [updatedData, setUpdatedData] = useState({})
  console.log(userData)
  console.log(props)
  console.log(updatedData)

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = () => {
    const id = localStorage.getItem('id')
    const axios = axiosWithAuth()
    axios.get(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/user`)
    .then((res) => {
      const currentUser = res.data.filter(
        (user) => user.id === Number(id)
      );
      console.log('currentUser =====> ', currentUser[0]);
      setUpdatedData({
        // ...form,
        first_name: currentUser[0].first_name,
        last_name: currentUser[0].last_name,
        birthday: currentUser[0].birthday,
      });
    })
    .catch((err) =>
      console.error(`unable to get user data`, err.message)
    )
  }

  const onChange = (evt) => {
    const { name, value } = evt.target;
    setUpdatedData(name, value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    props.updateProfile(updatedData);
  };

  return (
    <div>
      {!props.editing ? (
        <div>
          <h2>
            {props.user.first_name} {props.user.last_name}
          </h2>
          <p>{props.user.birthday}</p>
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

const mapStateToProps = state => {
  return {
    user: state.user,
    editing: state.editing
  }
}

export default connect(mapStateToProps, { toggleEditing, updateProfile })(UserProfile)
