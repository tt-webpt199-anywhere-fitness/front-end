import axiosWithAuth from '../utils/axiosWithAuth';

export const START_FETCHING = 'START_FETCHING';
export const ERROR = 'ERROR';
export const SUCCESS = 'SUCCESS';
export const FETCH_COURSES = 'FETCH_COURSES';
export const ADD_COURSES = 'ADD_COURSES';

export const getCourses = () => {
	return (dispatch) => {
		dispatch({ type: START_FETCHING });
		axiosWithAuth()
			.get('/')
			.then((res) => {
				console.log('Course data pulled from API =====> ', res);
				dispatch({ type: FETCH_COURSES, payload: res.data });
			})
			.catch((err) => {
				console.error('unable to pull course data', err.message);
				dispatch({ type: FETCH_ERROR, payload: err.message });
			});
	};
};

export const addNewCourse = (course) => {
	return (dispatch) => {
		dispatch({ type: ADD_COURSES });
		axiosWithAuth()
			.post(`/`, course)
			.then((res) => {
				console.log('Course data added to API =====> ', course);
				dispatch({ type: ADD_SUCCESS, payload: res.data });
				return res.data;
			})
			.catch((err) => {
				console.error('unable to add course data', err.message);
				dispatch({ type: FETCH_ERROR, payload: err.message });
			});
	};
};