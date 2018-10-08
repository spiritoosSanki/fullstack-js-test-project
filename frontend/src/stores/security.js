import { history } from '../components/BrowserRouter';

//TODO connected user is stored in local storage in case page reload. But we should not store it, and if we have a session tokem, we should fetch him from the backend


let connectedUser = null;


export function secureFetch(url, options) {
	if(!localStorage.session_token || localStorage.session_token==="undefined") {
 		logout();
 		return;
 	}
	if(!options.headers) {
		options.headers = new Headers();
	}
	options.headers.set('Authorization', 'Bearer ' + localStorage.session_token);

	if(!options.headers.get('Content-Type')) {
		options.headers.set('Content-Type', 'application/json');
	}

	if(options.body) {
		options.body = JSON.stringify(options.body);
	}

	return fetch(url, options).then(res => {
		if(res.status === 401) {
			logout(true);
			return;
		}
		return res.json();
	});
	
}

export function buildErrors(response) {
	if(response.errors) {
		return response.errors;
	} else if(response.responseMessage) {
		return [response.responseMessage];
	} else {
		return ['Ooops, something went wrong'];
	}
}

export function logout(expired) {
	localStorage.session_token = "";
	localStorage.connected_user = "";
	connectedUser = null;
	let end = "";
	if(expired) {
		end = "/expired";
	}
	history.push('/login' + end);
}

export function setConnectedUser(user) {
	connectedUser = user;
	localStorage.connected_user = JSON.stringify(user);
}

export function getConnectedUser() {

	if(!connectedUser) {
		connectedUser = getConnectedUserFromStorage();
	}

	if(!connectedUser) {
		logout();
		return null;
	}

	return connectedUser;
 }

function getConnectedUserFromStorage() {
	if(!localStorage.connected_user) {
		return null;
	}

	try {
		return JSON.parse(localStorage.connected_user);
	} catch(err) {
		return null;
	}
 }