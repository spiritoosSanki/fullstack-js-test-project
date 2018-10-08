var config = {
    development: {
        db: {
            host:   'localhost',
            login:   'fullstackjs_app',
            password: '1234',
            db: 'fullstackjs',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        },
        orm: {
            createTable: true
        },
        //server details
        server: {
            port: '4000'
        },
        security: {
            sessionTokenSecret: "a secret key for dev"
        }
    },
    test: {
        db: {
            host:   '192.168.72.51',
            login:   'fullstackjs_app',
            password: '1234',
            db: 'fullstackjs',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        },
        orm: {
            createTable: false
        },
        //server details
        server: {
            port: '4000'
        },
        security: {
            sessionTokenSecret: "a secret key for test"
        }
    },
    production: {
        
        db: {
            host:   '???',
            login:   '???',
            password: '???',
            db: '????',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        },
        orm: {
            createTable: false
        },
        //server details
        server: {
            port:   '4000'
        },
        security: {
            sessionTokenSecret: "a secret key for prod"
        }
    }
};
module.exports = config;