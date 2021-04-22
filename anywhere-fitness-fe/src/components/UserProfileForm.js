import React from "react";

export default function UserProfile(props) {
  return (
    <form className="userProfile">
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
