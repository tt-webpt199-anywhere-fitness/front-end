import {
  TOGGLE_EDITING,
  UPDATE_PROFILE
} from '../actions/index'

export const initialState = {
  user: {
    first_name: '',
    last_name: '',
    birthday: ''
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
    case TOGGLE_EDITING:
      return {
        ...state,
        editing: !state.editing
      }
    default:
      return state;
  }
}
