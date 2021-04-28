import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import schema from "../validation/registrationFormSchema";
import * as yup from "yup";

const initialValue = {
  username: "",
  password: "",
  role_id: 2,
};
const initialFormErrors = {
  username: "",
  password: "",
};

export default function Register() {
  const [newUser, setNewUser] = useState(initialValue);
  const history = useHistory();
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const onChange = (e) => {
    inputValidation(e);
    if (e.target.type === "checkbox") {
      setNewUser({
        ...newUser,
        [e.target.name]: !e.target.value,
      });
    }
    setNewUser({
      ...newUser,
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
    console.log(newUser);
    axios
      .post(
        `https://anywhere-fitness-wpt199-be.herokuapp.com/api/auth/register`,
        newUser
      )
      .then((res) => {
        console.log(res.data);
        history.push("/login");
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
              id="role_id"
              type="checkbox"
              onChange={onChange}
              value="1"
            ></input>
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
