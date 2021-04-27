import React from "react";

export default function CreateCourse(props) {
  return (
    <form className="classCreate">
      <label>
        Class Name:
        <input type="text" name="course" />
      </label>
      <label>
        Class Type:
        <input type="text" name="course_type" />
      </label>
      <label>
        Start Time:
        <input input="time" name="course_start" />
      </label>
      <label>
        Duration:
        <input type="text" name="course_duration" />
      </label>
      <label>
        Intensity Level:
        <input type="number" name="course_intensity" min="1" max="5" />
      </label>
      <label>
        Location:
        <input type="text" name="course_location" />
      </label>
      <label>
        Maximum Class Size:
        <input type="text" name="course_maxSize" />
      </label>
      <button name="course_create">Edit</button>
    </form>
  );
}
