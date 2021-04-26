import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const initialValue = {
  username: "",
  password: "",
  role_id: 2
}

export default function Register() {
  const [newUser, setNewUser] = useState(initialValue)

  const onChange = e => {
    // let value = e.target.type === "radio" ? e.target.checked : e.target.value
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  }


  const onSubmit = e => {
    e.preventDefault()
    console.log(newUser)
    axios.post(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/auth/register`, initialValue)
      .then(res => {
        console.log(res.data)
      })
      .catch(error => console.log(error))
  }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label for="username"> Enter Name </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder='enter your name'
            onChange={onChange}
            value={newUser.username}
          />


          <div>
            <label for="password"> Password </label>
            <input
              name="password"
              id="password"
              onChange={onChange}
              value={newUser.password}
            />

          </div>

          <div>
            <label for="interests"> Instructor </label>
            <input
              name="role_id"
              id="instructor"
              type='checkbox'
              onChange={onChange}
              value='1'
            >
            </input>

          </div>

          <div>
            <button> Submit </button>
          </div>


        </div>

      </form>
    </div>
  )
}