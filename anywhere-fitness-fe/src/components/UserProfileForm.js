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
          Birthday:
          <input type="date" name="user_birthday" />
        </label>
        <label>
          Address:
          <label>
            Street:
            <input type="text" name="street_address" />
          </label>
          <label>
            City:
            <input type="text" name="user_city" />
          </label>
          <label>
            State:
            <input type="text" name="user_state" />
          </label>
          <label>
            Zip:
            <input type="text" name="user_zip" />
          </label>
          <button name="user_edit">Edit</button>
        </label>
      </label>
    </form>
  );
}
