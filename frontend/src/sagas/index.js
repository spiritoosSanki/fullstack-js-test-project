import { all } from 'redux-saga/effects'
import { securitySagas } from './security'
import { loadingSagas } from './loading'
import { usersSagas } from './users'
 
 
export default function* rootSaga() {
	yield all([
	    ...securitySagas,
	    ...loadingSagas,
	    ...usersSagas
  ])
}
 
