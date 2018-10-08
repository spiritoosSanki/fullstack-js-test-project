export const ADD_USER = 'ADD_USER'
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'
export const USERS_FAILURE = 'USERS_FAILURE'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const DELETE_USER = 'DELETE_USER'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
export const LOADED_USERS = 'LOADED_USERS'
export const FETCH_USERS = 'FETCH_USERS'

 export function addUser(user) {
 	return { type: ADD_USER, user }
 }
 
 export function addUserSuccess(user) {
 	return { type: ADD_USER_SUCCESS, user }
 }
 
 export function usersFailure(error) {
 	return { type: USERS_FAILURE, error }
 }
 
 export function updateUser(user) {
 	return { type: UPDATE_USER, user }
 }
 
 export function updateUserSuccess(user) {
 	return { type: UPDATE_USER_SUCCESS, user }
 }
 
 export function deleteUser(id) {
 	return { type: DELETE_USER, id }
 }
 
 export function deleteUserSuccess(id) {
 	return { type: DELETE_USER_SUCCESS, id }
 }
 
 export function loadedUsers(users) {
 	return { type: LOADED_USERS, users }
 }
 
 export function fetchUsers() {
 	return { type: FETCH_USERS }
 }