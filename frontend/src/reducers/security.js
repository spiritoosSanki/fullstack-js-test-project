import {
	SUBMIT_LOGIN,
	SUBMIT_LOGIN_SUCCESS,
	SUBMIT_LOGIN_AFTER_SUCESS,
	SUBMIT_LOGIN_FAILURE
} from '../actions/security'
 
export const SECURITY_DEFAULT_STATE = {
	loading: false,
	validLogin: false,
	error: ''
}

export default function security (state = SECURITY_DEFAULT_STATE, action) {
	switch (action.type) {
		case SUBMIT_LOGIN:
			return {...state, loading: true}

		case SUBMIT_LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				validLogin: true,
				error: ''
			}

		case SUBMIT_LOGIN_AFTER_SUCESS:
			return SECURITY_DEFAULT_STATE

		case SUBMIT_LOGIN_FAILURE:
			return {
				...state, 
				loading: false, 
				validLogin: false,
				error: action.error
			}

		default:
			return state
	}
 }