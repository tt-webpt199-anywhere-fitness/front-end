import React from "react";

export default function InstructorProfile(props) {
  return (
    <form className="instructorProfile">
      <label>
        Name:
        <label>
          First:
          <input type="text" name="first_name" />
        </label>
        <label>
          Last:
          <input type="text" name="last_name" />
        </label>
        <label>
          Age:
          <input name="user_age" />
        </label>
        <label>
          Birthday:
          <input type="date" name="user_birthday" />
        </label>
        <button name="user_edit">Edit</button>
      </label>
    </form>
  );
}
