import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';

const initialValue = {
  username: "",
  password: ""
}

export default function Login() {
  const [credentials, setCredentials] = useState(initialValue)
  const history = useHistory()

  const onChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }


  const onSubmit = e => {
    e.preventDefault()
    axios.post(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/auth/login`, credentials)
      .then(res => {
        console.log(res)
        console.log(res.data.token)
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
            value={credentials.username}
          />

          <div>
            <label for="password"> Password </label>
            <input
              name="password"
              id="password"
              onChange={onChange}
              value={credentials.password}
            />

          </div>

          <div>
            <button> Submit </button>
          </div>


        </div>

      </form>
    </div>
  )
}