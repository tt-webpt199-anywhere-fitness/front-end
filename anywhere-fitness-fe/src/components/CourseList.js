import React, { useEffect, useState } from "react";
import Course from "./Course";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialSearchTerms = {
  searchTerm: "",
  filterType: "",
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState(initialSearchTerms);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    const axios = axiosWithAuth();
    axios
      .get(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/courses`)
      .then((res) => {
        console.log("getCourses results", res);
        setCourses(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const axios = axiosWithAuth();
    axios
      .get(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/courses`)
      .then((res) => {
        const searchTerm = search.searchTerm.toLowerCase();
        const filterType = search.filterType;
        const arrayFilter = res.data.filter((course) => {
          return course[`${filterType}`].includes(searchTerm);
        });
        setCourses(arrayFilter);
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
            value={search.searchTerm}
          />
        </label>
        <label>
          &nbsp; Search By:
          <select
            name="searchFilter"
            onChange={searchChange}
            value={search.filterType}
          >
            <option value="course">Course Name</option>
            <option value="start">Class Time</option>
            <option value="duration">Class Duration</option>
            <option value="course_type">Class Type</option>
            <option value="intensity">Intensity Level</option>
            <option value="location">Class Location</option>
          </select>
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
