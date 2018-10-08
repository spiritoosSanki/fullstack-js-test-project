import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { FETCH_USERS, ADD_USER, DELETE_USER, UPDATE_USER, loadedUsers, usersFailure, addUserSuccess, updateUserSuccess, deleteUserSuccess } from '../actions/users'
import { secureFetch, buildErrors } from '../stores/security'
 
 
function* getAllUsers(action) {
 	try {
		
		const response = yield call(secureFetch, 'users/', { method: 'GET' })

		if(response.responseCode === 0) {
			yield put(loadedUsers(response.users))
		} else {
			yield put(usersFailure(buildErrors(response)))
		}
	} catch (e) {
	 	yield put(usersFailure([e.message]))
	}
 }
 
function* saveUser (action) {
	try {
		const response = yield call(secureFetch, 'users/', {
			method: 'PUT',
			body: action.user
		})
		if(response.responseCode === 0) {
			yield put(addUserSuccess(response.user))
		} else {
			yield put(usersFailure(buildErrors(response)))
		}
	} catch (e) {
	 	yield put(usersFailure([e.message]))
	}
}
 
function* deleteUser (action) {
	try {
		const response = yield call(secureFetch, `users/${action.id}`, { method: 'DELETE' })
		if(response.responseCode === 0) {
			yield put(deleteUserSuccess(action.id))
		} else {
			yield put(usersFailure(buildErrors(response)))
		}
	} catch (e) {
	 	yield put(usersFailure([e.message]))
	}
 }
 
 function* updateUser (action) {
	try {
		const response = yield call(secureFetch, 'users/', {
			method: 'POST',
			body: action.user
		})
		if(response.responseCode === 0) {
			yield put(updateUserSuccess(response.user))
		} else {
			yield put(usersFailure(buildErrors(response)))
		}
	 } catch (e) {
	 	yield put(usersFailure([e.message]))
	 }
}

 
export const usersSagas = [
	takeLatest(FETCH_USERS, getAllUsers),
	takeLatest(ADD_USER, saveUser),
	takeLatest(DELETE_USER, deleteUser),
	takeEvery(UPDATE_USER, updateUser)
]