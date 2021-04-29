import { combineReducers } from 'redux'
import { courseReducer } from './courseReducer'
import { profileReducer } from './profileReducer'

export default combineReducers({course: courseReducer, profile: profileReducer})
