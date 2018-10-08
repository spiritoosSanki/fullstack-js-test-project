const {ActionLog} = require('../models/actionLog');
const uuidv4 = require('uuid/v4');

const ACTION_CREATES = "created";
const ACTION_UPDATES = "updated";
const ACTION_GET = "retrieved";
const ACTION_DELETES = "deleted";

const ORIGIN_API = "API";

async function log(origin, api, user, action, object1Label, object1, object2Label, object2) {
	const log = ActionLog.build({
		id: uuidv4(),
		origin: origin,
		api: api,
		userId: user.id,
		username: user.username,
		action: action,
		object1Label: object1Label,
		object1: stringify(object1),
		object2Label: object2Label,
		object2: stringify(object2)
	});

	await log.save();
	return log;
};

function stringify(object) {
	try {
		return JSON.stringify(object);
	} catch(err) {
		return object + "";
	}
}

module.exports = {
  log, ACTION_CREATES, ACTION_UPDATES, ACTION_GET, ACTION_DELETES, ORIGIN_API
}