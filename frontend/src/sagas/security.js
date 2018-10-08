import { call, put, takeEvery } from 'redux-saga/effects'
import { SUBMIT_LOGIN, submitLoginSuccess, submitLoginAfterSuccess, submitLoginFailure } from '../actions/security'
import { setConnectedUser } from '../stores/security'

 
function* postLogin(action) {
	try {
		const options = {
			method: 'POST',
			body: JSON.stringify(action.signInForm),
			headers: new Headers({
			 	'Content-Type': 'application/json'
			})
		}
		 
		const res = yield call(fetch, 'security/login', options)
		const response = yield res.json()
		if(res.status === 200 && response.responseCode === 0) {
			localStorage.session_token = response.token;
			setConnectedUser(response.user);
			yield put(submitLoginSuccess())
			yield put(submitLoginAfterSuccess())
		} else {
			localStorage.session_token = '';
			yield put(submitLoginFailure('Wrong login or password'))
		}
		
		
	} catch (e) {
	 	yield put(submitLoginFailure(e.message))
	}
}

 
 
export const securitySagas = [
	takeEvery(SUBMIT_LOGIN, postLogin)
]
 