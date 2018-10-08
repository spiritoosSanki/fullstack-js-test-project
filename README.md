# INTRODUCTION:

My goal was to build the base of a fullstack js web app, ready to use.
I've been reading on this for some time now and I wanted to try.
I found that there is a lot of documentation on specific subject (how to build a js server, how to use the react router, how to use jwt) but it can be hard when you try to combine all of it together.

In this project you will find the backend in node.js and the frontend in react. I didn't get to the point of styling. 
It is only the very begining of an app, you can then expand and adapt it to your needs.
I started with this tutorial that helped me a lot: https://medium.com/jtribe/node-js-in-2018-full-stack-tutorial-with-koa-react-redux-sagas-and-mongodb-14a7efaee4d4

So here is the stack.
Backend in node.js:
- koa (web server framework, from the same guys that made express. It is much cleaner than express by using async function)
- activedirectory (I tested the connection to an AD. now it is commented.)
- bcrypt (to encrypt passwords before saving them in the database)
- jsonwebtoken (to have connection session based on jwt)
- sequelize (orm to connect map and connect to mariadb)
- uuid (to generate uuids for primary keys)
- I added a really simple system to check ressource access (SecurityService.checkAccess([TYPE_ADMIN, TYPE_USER], ctx))
- I added a service to read parameters from a config file. It manages enviromnent too.

Frontend in react.js:
- react-router (for history and page diplay)
- redux (for state management)
- saga (for async tasks)

# INSTALL

Checkout the project.
In the root folder, run: npm i.
Do the same in both backend and frontend folder.

Create the database using the script in backend/dbscripts/:
https://github.com/spiritoosSanki/fullstack-js-test-project/blob/master/backend/dbscripts/20181001.sql

Then either run both backend and frontend at the same time. In the root folder, run:
npm start

Or run them independently.
To start backend, in backend folder: npm run dev
To start frontend, in frontend folder: npm start

The backend will run on port 4000.
The frontend will run on port 3000.

# TIPS

Test the login with:
curl -H "Content-Type: application/json" -X POST --data "{\"login\":\"admin\", \"password\":\"test\"}" http://localhost:4000/v1/security/login

If the servers dont start because port is already in use, run this command (windows) to kill the process running (here on port 4000):
FOR /F "tokens=6 delims= " %a in ('netstat -a -o -n ^| findstr 4000 ^|findstr/n .*^|findstr "^1:"') do SET pid=%a & taskkill /F /PID %pid%


