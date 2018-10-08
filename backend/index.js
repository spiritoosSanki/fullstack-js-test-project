require('dotenv').config();
const server = require('./server')
const config = require('./services/ConfigService').config;

const port = process.env.PORT || config.server.port || 4000
server.listen(port, () => console.log(`API server started on ${port}`))
