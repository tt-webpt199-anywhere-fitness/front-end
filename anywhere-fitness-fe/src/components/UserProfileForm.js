import React from "react";
import Course from "./Course";

export default function UserProfile(props) {
  const { user, userCourses, change, submit } = props;

  const onChange = (evt) => {
    const { name, value } = evt.target;
    change(name, value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  return (
    <div className="userProfilePage">
      <form className="userProfile" onSubmit={onSubmit}>
        <label>
          Name:
          <label>
            First:
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={onChange}
            />
          </label>
          <label>
            Last:
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={onChange}
            />
          </label>
          <label>
            Birthday:
            <input
              type="date"
              name="user_birthday"
              value={user.birthday}
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
        <h2>Register Classes</h2>
        {userCourses.map((course) => {
          return <Course course={course} />;
        })}

        {/* Should display course that the user in registered for */}
      </div>
    </div>
  );
}
