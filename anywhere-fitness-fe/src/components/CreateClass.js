import React from "react";

export default function CreateClass(props) {
  return (
    <form className="classCreate">
      <label>
        Class Name:
        <input type="text" name="class_name" />
      </label>
      <label>
        Class Type:
        <input type="text" name="class_type" />
      </label>
      <label>
        Start Time:
        <input input="time" name="class_startTime" />
      </label>
      <label>
        Duration:
        <input type="text" name="class_duration" />
      </label>
      <label>
        Intensity Level:
        <select name="class_intensity">
          <option value="">Select Intensity</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </label>
      <label>
        Location:
        <input type="text" name="class_location" />
      </label>
      <label>
        Maximum Class Size:
        <input type="text" name="class_maxSize" />
      </label>
      <button name="class_create">Edit</button>
    </form>
  );
}
