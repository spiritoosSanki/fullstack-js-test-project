Install git and npm
Start the terminal as admin
On checkout go to backend, run: npm i
Then go to frontend, run: npm i
Go back to main folder, run: npm i
npm config set script-shell "C:\\Program Files\\Git\\bin\\bash.exe"


Test :
curl -H "Content-Type: application/json" -X POST --data "{\"login\":\"test\", \"password\":\"test\"}" http://localhost:4000/v1/security/login
curl -X POST -H "Authorization: Bearer TOKEN_HERE" http://localhost:4000/v1/security/checkSession

If the servers dont start because port is already in use:
Find the process PID (here on port 4000):
FOR /F "tokens=6 delims= " %a in ('netstat -a -o -n ^| findstr 4000 ^|findstr/n .*^|findstr "^1:"') do SET pid=%a & taskkill /F /PID %pid%



Source :
Follow : https://medium.com/jtribe/node-js-in-2018-full-stack-tutorial-with-koa-react-redux-sagas-and-mongodb-14a7efaee4d4

https://github.com/koajs/jwt#usage
https://github.com/clintmod/koa-jwt-login-example
https://github.com/clintmod/koa-jwt-login-example/blob/master/src/app.js
https://reacttraining.com/react-router/web/example/basic
