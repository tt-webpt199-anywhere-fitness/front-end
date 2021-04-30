import {
  UPDATE_PROFILE
} from '../actions/index'

export const initialState = {
  user: {
    username: '',
    courses: []
  },
  editing: false
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        user: action.payload,
        editing: false
      }
    default:
      return state;
  }
}
