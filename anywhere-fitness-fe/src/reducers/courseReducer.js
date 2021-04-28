import {
	START_FETCHING,
	ERROR,
	SUCCESS,
	FETCH_COURSES,
	ADD_COURSES,
} from '../actions';

export const initialState = {
	courses: [],
	isLoading: false,
	addedCourse: false,
	error: '',
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
				courses: [...state.courses, action.payload],
			};
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