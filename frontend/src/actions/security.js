export const SUBMIT_LOGIN = 'SUBMIT_LOGIN'
export const SUBMIT_LOGIN_SUCCESS = 'SUBMIT_LOGIN_SUCCESS'
export const SUBMIT_LOGIN_AFTER_SUCESS = 'SUBMIT_LOGIN_AFTER_SUCESS'
export const SUBMIT_LOGIN_FAILURE = 'SUBMIT_LOGIN_FAILURE'

export function submitLogin(signInForm) {
	return { type: SUBMIT_LOGIN, signInForm }
}

export function submitLoginSuccess() {
	return { type: SUBMIT_LOGIN_SUCCESS }
}

export function submitLoginAfterSuccess() {
	return { type: SUBMIT_LOGIN_AFTER_SUCESS }
}

export function submitLoginFailure(error) {
	return { type: SUBMIT_LOGIN_FAILURE, error }
}