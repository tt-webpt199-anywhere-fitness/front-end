import React from "react";
import Course from "./Course";

export default function InstructorProfile(props) {
  const { instructor, instructorCourses, change, submit } = props;

  const onChange = (evt) => {
    const { name, value } = evt.target;
    change(name, value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };
  return (
    <div instructorProfilePage>
      <form className="instructorProfile" onSubmit={onSubmit}>
        <label>
          Name:
          <label>
            First:
            <input
              type="text"
              name="first_name"
              onChange={onChange}
              value={instructor.first_name}
            />
          </label>
          <label>
            Last:
            <input
              type="text"
              name="last_name"
              onChange={onChange}
              value={instructor.last_name}
            />
          </label>
          <label>
            Birthday:
            <input
              type="date"
              name="user_birthday"
              onChange={onChange}
              value={instructor.birthday}
            />
          </label>
          <button name="instructor_edit">Edit</button>
        </label>
      </form>
      <div className="instructorCourses">
        <h2>List of Classes</h2>
        {instructorCourses.map((course) => {
          return <Course course={course} />;
        })}
        {/* should display the instructor's courses */}
      </div>
    </div>
  );
}
