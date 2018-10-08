import {
	ADD_USER,
	ADD_USER_SUCCESS,
	USERS_FAILURE,
	UPDATE_USER,
	UPDATE_USER_SUCCESS,
	DELETE_USER,
	DELETE_USER_SUCCESS,
	LOADED_USERS,
	FETCH_USERS
} from '../actions/users'
 
export const USERS_DEFAULT_STATE = {
	loading: false,
	saving: false,
	deleting: false,
	error: [],
	users: []
}

export default function users (state = USERS_DEFAULT_STATE, action) {
	switch (action.type) {
		case LOADED_USERS:
			return {
				...state, 
				error: [],
				users: action.users, 
				loading: false
			}

		case FETCH_USERS:
			return {
				...state,
				error: [], 
				users:[], 
				loading: true
			}

		case ADD_USER:
			return {
				...state,
				error: [],
				saving: true
			}

		case ADD_USER_SUCCESS:
			return {
				...state,
				error: [],
				users: state.users.concat(action.user),
				saving: false
			}

		case USERS_FAILURE:
			return {
				...state, 
				loading: false, 
				saving: false, 
				deleting: false,
				error: action.error
			}

		case DELETE_USER:
			return {
				...state, 
				error: [],
				deleting: true
			}

		case DELETE_USER_SUCCESS:
			return {
				...state,
				error: [],
				deleting: false,
	 			users: state.users.reduce((users, user) =>
	 				user.id !== action.id ? users.concat(user) : users, []
	 			)
	 		}

		case UPDATE_USER:
			return {
				...state, 
				error: [],
				saving: true
			}

		case UPDATE_USER_SUCCESS:
			return {
				...state,
				error: [],
				users: state.users.map(user => 
					user.id === action.user.id ? action.user : user 
				),
				saving: false
			}

		default:
			return state
	}
 }