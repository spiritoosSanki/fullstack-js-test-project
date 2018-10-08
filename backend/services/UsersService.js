//const ActiveDirectory = require('./activedirectory');
const {User, TYPE_USER} = require('../models/user');
var bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const saltRounds = 10;


async function findOneWhere(conditions) {
	return await User.findOne({
	  where: conditions
	});
};

async function getAll(where) {
	return (await User.findAll({
		where: where,
		order: [['username', 'DESC']],
		//logging: console.log
	})).map(user => {user.password = ""; return user;});
	
}

async function create(user) {

	let where = {[Op.or]: [{username: user.username}]};
	let id = null;
	if(!user.id) {
		id = uuidv4();
	} else {
		id = user.id;
		where[Op.or].push({id: user.id});
	}
	const existing = await User.findOne({
	  where: where
	});

	if(existing) {
		throw {
			name: "FullstackError",
			errors: ["Username or id already exists"]
		};
	} else {
		user.id = id;
		user.type = TYPE_USER;
		const userEntity = User.build(user);
		await userEntity.validate();

		userEntity.password = await bcrypt.hash(userEntity.password, saltRounds);
		await userEntity.save();
		userEntity.password = '';
		return userEntity;
	}
}



async function update(user) {

	const existing = await User.findOne({where: {id: user.id}});

	if(!existing) {
		throw { //TODO create a class
			name: "FullstackError",
			statusCode: 404,
			errors: ["User does not exist"]
		};
	}

	if(user.username != existing.username) {
		const homonyme = await User.findOne({
			where: {
		  		username: user.username
		  	}
		});
		if(homonyme) {
			throw {
				name: "FullstackError",
				errors: ["Username already exists"]
			};
		}
	}

	const userEntity = User.build(user);
	await userEntity.validate();
	userEntity.password = await bcrypt.hash(userEntity.password, saltRounds);

	await existing.update({
		username: user.username,
		password: user.password
	});
	existing.password = '';
	return existing;
}


async function remove(id) {
	User.destroy({where: {id: id}});
}
	

module.exports = {
  findOneWhere, create, getAll, update, remove
}