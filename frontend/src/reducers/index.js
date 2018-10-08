 import { combineReducers } from 'redux'
 import security, { SECURITY_DEFAULT_STATE } from './security'
 import loading, { CHECK_SESSION_DEFAULT_STATE } from './loading'
 import users, { USERS_DEFAULT_STATE } from './users'
 
 const reducers = combineReducers({
 	security,
 	loading,
 	users
 })
 
 export const DEFAULT_STATE = {
 	security: SECURITY_DEFAULT_STATE,
 	loading: CHECK_SESSION_DEFAULT_STATE,
 	users: USERS_DEFAULT_STATE
 }
  
 export default reducers
