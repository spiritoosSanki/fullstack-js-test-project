import {
	CHECK_SESSION,
	HAS_VALID_SESSION,
	HAS_NO_VALID_SESSION,
	CHECK_SESSION_ERROR,
	LOGING_OUT
} from '../actions/loading'
 
export const CHECK_SESSION_DEFAULT_STATE = {
	showLoading: true,
	invalid: true,
	error: false
}

export default function loading (state = CHECK_SESSION_DEFAULT_STATE, action) {
	switch (action.type) {
		case CHECK_SESSION:
			return state

		case HAS_VALID_SESSION:
			return {
				...state,
				showLoading: false,
				invalid: false,
				error: false
			}

		case HAS_NO_VALID_SESSION:
			return {
				...state,
				showLoading: false,
				invalid: true,
				error: false
			}


		case CHECK_SESSION_ERROR:
			return {
				...state,
				showLoading: true,
				invalid: false,
				error: true
			}

		case LOGING_OUT:
			return CHECK_SESSION_DEFAULT_STATE

		default:
			return state
	}
 }