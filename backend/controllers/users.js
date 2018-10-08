const UsersService = require('../services/UsersService');
const SecurityService = require('../services/SecurityService');
const ActionLogService = require('../services/ActionLogService');
const { TYPE_ADMIN, TYPE_USER } = require('../models/user');

const API_USERS = "USERS";

async function get(ctx) {

  const user = SecurityService.checkAccess([TYPE_ADMIN, TYPE_USER], ctx);
  let where = {type: TYPE_USER};
  if(user.type === TYPE_ADMIN) {
    where = {};
  }

  ctx.ok({
    responseCode: 0,
    responseMessage: "OK",
    users: await UsersService.getAll(where)
  })
  ActionLogService.log(ActionLogService.ORIGIN_API, API_USERS, user, ActionLogService.ACTION_GET, "all");
}

async function create(ctx) {

  const connectedUser = SecurityService.checkAccess(TYPE_ADMIN, ctx);

  const newUser = await UsersService.create(ctx.request.body.user);
  ctx.ok({
    responseCode: 0,
    responseMessage: "OK",
    user: newUser
  })
  ActionLogService.log(ActionLogService.ORIGIN_API, API_USERS, connectedUser, ActionLogService.ACTION_CREATES, "one user", newUser);
}

async function update(ctx) {

  const user = ctx.request.body.user;
  const connectedUser = SecurityService.checkAccess([TYPE_ADMIN, TYPE_USER], ctx);

  if(connectedUser.type === TYPE_ADMIN) {
    if(connectedUser.id === user.id) {
      user.username = connectedUser.username; // admin cannot update its username
    }
  } else if(connectedUser.id !== user.id) {
    ctx.throw(403, 'Operation not allowed');
  }

  const updatedUser = await UsersService.update(user);
  ctx.ok({
    responseCode: 0,
    responseMessage: "OK",
    user: updatedUser
  })

  ActionLogService.log(ActionLogService.ORIGIN_API, API_USERS, connectedUser, ActionLogService.ACTION_UPDATES, "one user", user, "updated user", updatedUser);
}

async function remove(ctx) {

  const connectedUser = SecurityService.checkAccess([TYPE_ADMIN, TYPE_USER], ctx);
  if((connectedUser.type !== TYPE_ADMIN) || (connectedUser.id === ctx.params.id)) {
    ctx.throw(403, 'Operation not allowed');
  }

  await UsersService.remove(ctx.params.id);

  ctx.ok({
    responseCode: 0,
    responseMessage: "OK"
  })
  ActionLogService.log(ActionLogService.ORIGIN_API, API_USERS, connectedUser, ActionLogService.ACTION_DELETES, "one user with id", ctx.params.id);
}

module.exports = {
  get, create, update, remove
}
