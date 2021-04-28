import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import schema from "../validation/loginFormSchema";
import * as yup from "yup";

const initialValue = {
  username: "",
  password: "",
};
const initialFormErrors = {
  username: "",
  password: "",
};

export default function Login() {
  const [credentials, setCredentials] = useState(initialValue);
  const history = useHistory();
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const onChange = (e) => {
    inputValidation(e);
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const inputValidation = (e) => {
    yup
      .reach(schema, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://anywhere-fitness-wpt199-be.herokuapp.com/api/auth/login`,
        credentials
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        history.push("/classes");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label for="username"> Enter Name </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="enter your name"
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
          <div className="errors">
            <div>{formErrors.username}</div>
            <div>{formErrors.password}</div>
          </div>
          <div>
            <button> Submit </button>
          </div>
        </div>
      </form>
    </div>
  );
}
