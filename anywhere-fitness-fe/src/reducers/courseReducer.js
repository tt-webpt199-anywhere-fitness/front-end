import {
	START_FETCHING,
	ERROR,
	SUCCESS,
	FETCH_COURSES,
	ADD_COURSES,
	DELETE_COURSE,
	UPDATE_COURSE
} from '../actions';

export const initialState = {
	courses: [],
	single_course: {},
	isLoading: false,
	addedCourse: false,
	editing: false,
	error: ''
};

export const courseReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_FETCHING: {
			return {
				...state,
				isLoading: true,
				error: '',
			};
		}

		case FETCH_COURSES: {
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		}

		case UPDATE_COURSE:
			return {
				...state,
				single_course: action.payload,
				editing: false
			}

		case ERROR: {
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		}

		case ADD_COURSES: {
			return {
				...state,
				addedCourse: true,
				courses: [...state.courses, action.payload]
			};
		}

		case DELETE_COURSE: {
			return {
				...state,
				courses: [...state.courses, action.payload]
			}
		}

		case SUCCESS: {
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		}
		default:
			return state;
	}
};