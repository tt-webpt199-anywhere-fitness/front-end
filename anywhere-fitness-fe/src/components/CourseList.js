import React, { useEffect, useState } from "react";
import Course from "./Course";
import axiosWithAuth from "../utils/axiosWithAuth";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const axios = axiosWithAuth();
    axios
      .get(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/courses`)
      .then((res) => {
        console.log(res);
        setCourses(res.data);
        const searchArray = courses.filter((course) => {
          return course.course.toLowerCase().includes(search.toLowerCase());
        });
        console.log(searchArray);
        console.log("getCourses results", res);
        setCourses(searchArray);
      })
      .catch((err) => console.log(err));
  }, [search]);

  const searchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <form>
        <label>
          Search: &nbsp;
          <input
            type="text"
            name="searchbar"
            onChange={searchChange}
            value={search}
          />
        </label>
      </form>
      <div className="courses">
        {courses &&
          courses.map((course, index) => {
            return <Course course={course} key={index} />;
          })}
      </div>
    </div>
  );
};

export default CourseList;
