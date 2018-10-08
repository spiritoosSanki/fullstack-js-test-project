//const ActiveDirectory = require('./activedirectory');
const jsonwebtoken = require('jsonwebtoken');
const config = require('./ConfigService').config;
const UserService = require('./UsersService');
const {TYPE_USER, TYPE_ADMIN} = require('../models/user');
var bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Check the credentials with Active Directory. If credentials are correct, nothing happen. If not, an error is thrown.
 * @param  {String}   login    login/username to be checked. Simple username, no domain name. Example: toto. And not toto@domain.com
 * @param  {String}   password password to be checked
 * @return {Promise}	a promise
 * @throws {Exception} If credentials are wrong or if there is a technical error
 */
async function checkLoginPassword(login, password) {
		
	let user = await UserService.findOneWhere({username: login});

	if(!user) {
		throw "Credentials error";
	}

	let validCredentials = await bcrypt.compare(password, user.password);

	if(validCredentials) {
		user.password = '';
		return user;
	} else {
		throw "Credentials error";
	}

};

//TODO delete after admin has been created
async function createAdmin() {
  await UserService.create({
	  username: "admin",
	  password: "test",
	  type: TYPE_ADMIN
  });
};

function createToken(user) {
	return jsonwebtoken.sign({
        data: user,
        //exp in seconds
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 60 seconds * 60 minutes = 1 hour
    }, config.security.sessionTokenSecret)
};

function checkAccess(types, ctx) {
	const token = ctx.request.header.authorization.replace('Bearer ', '');
	const user = jsonwebtoken.verify(token, config.security.sessionTokenSecret).data;
	if(!Array.isArray(types)) {
		types = [types];
	}

	if(types.includes(user.type)) {
		return user;
	} else {
		ctx.throw(403, 'Restriced ressource');
	}
	
};

/**
 * Check the credentials with Active Directory. If credentials are correct, nothing happen. If not, an error is thrown.
 * @param  {String}   login    login/username to be checked. Simple username, no domain name. Example: toto. And not toto@domain.com
 * @param  {String}   password password to be checked
 * @return {Promise}	a promise
 * @throws {Exception} If credentials are wrong or if there is a technical error (e.g. AD not reachable)
 */
/*async function checkLoginPassword(login, password) {
	return new Promise((resolve, reject) => {
		const url = 'ldap://192.168.100.101';//TODO retrieve in config
		const username = login + '@fullstackjs.local';
		const config = { 
			url: url, 
	        baseDN: 'dc=fullstackjs,dc=local',
	        username: username,
	        password: password 
	    }
		const ad = new ActiveDirectory(config);

		ad.userExists(username, function(err, exists) {
		  if(err) {
		  	if(err.code == "ETIMEDOUT") {
		  		console.log("Can't reach active directory"); console.log(JSON.stringify(err)); //TODO Should write it to a log file
		  	}
		    reject(err);
		    return;
		  }

		  resolve();
		});
	});
};*/
	

module.exports = {
  checkLoginPassword, checkAccess, createToken
}