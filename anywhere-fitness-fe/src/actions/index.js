import axiosWithAuth from '../utils/axiosWithAuth';

export const START_FETCHING = 'START_FETCHING';
export const ERROR = 'ERROR';
export const SUCCESS = 'SUCCESS';
export const FETCH_COURSES = 'FETCH_COURSES';
export const ADD_COURSES = 'ADD_COURSES';
export const TOGGLE_EDITING = 'TOGGLE_EDITING';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const updateProfile = (user) => {
	return {
		type: UPDATE_PROFILE,
		payload: user
	}
}

export const toggleEditing = () => {
	return { type: TOGGLE_EDITING }
}

export const getCourses = () => {
	return (dispatch) => {
		dispatch({ type: START_FETCHING });
		axiosWithAuth()
			.get('/courses')
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
