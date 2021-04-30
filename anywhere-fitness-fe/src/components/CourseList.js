import React, { useEffect, useState } from "react";
import Course from "./Course";
import axiosWithAuth from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import { toggleEditing, updateProfile } from "../actions";

const initialSearchTerms = {
  searchTerm: "",
  filterType: "course",
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
        const lowerSearchTerm = search.searchTerm.toLowerCase();
        console.log(search.searchTerm.toLowerCase());

        const arrayFilter = res.data.filter((course) => {
          console.log(course[search.filterType]);
          return course[search.filterType]
            .toLowerCase()
            .includes(lowerSearchTerm.toString());
        });
        setCourses(arrayFilter);
      })
      .catch((err) => console.log(err));
  }, [search]);

  const searchChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
    console.log(search);
  };

  return (
    <div className="course-list">
      <form>
        <label>
          Search: &nbsp;
          <input
            type="text"
            name="searchTerm"
            onChange={searchChange}
            value={search.searchTerm}
          />
        </label>
        <label>
          &nbsp; Search By:
          <select
            name="filterType"
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
const mapStateToProps = (state) => {
  return {
    courses: [],
    isLoading: false,
    addedCourse: false,
    error: "",
  };
};

export default CourseList;
