import { call, put, takeLatest } from 'redux-saga/effects'
import { CHECK_SESSION, hasValidSession, hasNoValidSession, checkSessionError, LOGING_OUT } from '../actions/loading'
import { secureFetch, logout } from '../stores/security'
 
 
 
 function* checkSession(action) {
 	
	try {
		 
		const response = yield call(secureFetch, 'security/checkSession', { method: 'POST' })

		if(response.responseCode === 0) {
			yield put(hasValidSession())
		} else {
			yield put(hasNoValidSession())
		}
		
	} catch (e) {
	 	yield put(checkSessionError())
	}
 }


function* handleLogout(action) {
	logout();
	yield put(hasNoValidSession())
}
 
 
 
 export const loadingSagas = [
	 takeLatest(CHECK_SESSION, checkSession),
	takeLatest(LOGING_OUT, handleLogout)
 ]