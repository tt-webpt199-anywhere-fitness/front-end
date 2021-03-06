import axiosWithAuth from '../utils/axiosWithAuth';

export const START_FETCHING = 'START_FETCHING';
export const ERROR = 'ERROR';
export const SUCCESS = 'SUCCESS';
export const FETCH_COURSES = 'FETCH_COURSES';
export const ADD_COURSES = 'ADD_COURSES';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';

export const updateProfile = (user) => {
	return {
		type: UPDATE_PROFILE,
		payload: user
	}
}

export const getCourses = () => {
	return (dispatch) => {
		dispatch({ type: START_FETCHING });
		axiosWithAuth()
			.get(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/courses`)
			.then((res) => {
				console.log('Course data pulled from API =====> ', res);
				dispatch({ type: FETCH_COURSES, payload: res.data });
			})
			.catch((err) => {
				console.error('unable to pull course data', err.message);
				dispatch({ type: ERROR, payload: err.message });
			});
	};
};

export const getProfile = () => {
	const id = localStorage.getItem('id')
	return (dispatch) => {
		dispatch({ type: START_FETCHING });
		axiosWithAuth()
			.get(`https://anywhere-fitness-wpt199-be.herokuapp.com/api/user`)
			.then((res) => {
				const currentUser = res.data.filter(
					(user) => user.id === Number(id)
				);
				console.log('currentUser =====> ', currentUser[0]);
				dispatch({
					type: SUCCESS,
					payload: {
						username: currentUser[0].username
					}
				});
			})
			.catch((err) =>
				console.error(`unable to get user data`, err.message)
			)
	}
}

export const addNewCourse = (course) => {
	return (dispatch) => {
		dispatch({ type: ADD_COURSES });
		axiosWithAuth()
			.post(`/courses`, course)
			.then((res) => {
				console.log('Course data added to API =====> ', course);
				dispatch({ type: SUCCESS, payload: res.data });
				return res.data;
			})
			.catch((err) => {
				console.error('unable to add course data', err.message);
				dispatch({ type: ERROR, payload: err.message });
			});
	};
};

export const updateCourse = (course) => {
	return (dispatch) => {
		const id = Number(course.course_id)
		dispatch({ type: UPDATE_COURSE});
		axiosWithAuth()
			.put(`/courses/${id}`, course)
			.then((res) => {
				console.log('updateCourse res', res)
				dispatch({ type: SUCCESS, payload: res.data });
				return res.data
			})
			.catch((err) => {
				console.log('updateCourse err', err)
			})
	}
}

export const deleteCourse = (course_id) => {
	return (dispatch) => {
		const id = Number(course_id)
		dispatch({ type: DELETE_COURSE});
		axiosWithAuth()
			.delete(`/courses/${id}`)
			.then((res) => {
				console.log(res)
				return res.message
			})
			.catch((err) => 
			console.log(err)
			)
	}
}
