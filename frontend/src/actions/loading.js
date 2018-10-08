export const CHECK_SESSION = 'CHECK_SESSION'
export const HAS_VALID_SESSION = 'HAS_VALID_SESSION'
export const HAS_NO_VALID_SESSION = 'HAS_NO_VALID_SESSION'
export const CHECK_SESSION_ERROR = 'CHECK_SESSION_ERROR'
export const LOGING_OUT = 'LOGING_OUT'
export function checkSession() {
	return { type: CHECK_SESSION }
}

export function hasValidSession() {
	return { type: HAS_VALID_SESSION }
}

export function hasNoValidSession() {
	return { type: HAS_NO_VALID_SESSION }
}

export function checkSessionError() {
	return { type: CHECK_SESSION_ERROR }
}

export function logingOut() {
	return { type: LOGING_OUT }
}
