
Here is the stack for the node.js backend:
- koa (web server framework, from the same guys that made express. It is much cleaner than express by using async function)
- activedirectory (I tested the connection to an AD. now it is commented.)
- bcrypt (to encrypt passwords before saving them in the database)
- jsonwebtoken (to have connection session based on jwt)
- sequelize (orm to connect map and connect to mariadb)
- uuid (to generate uuids for primary keys)
- I added a really simple system to check ressource access (SecurityService.checkAccess([TYPE_ADMIN, TYPE_USER], ctx))
