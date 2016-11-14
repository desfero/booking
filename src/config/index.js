import defaults from './defaults.json';

const config = {
    sessionSecret: defaults.sessionSecret,
    mongoDB: global.process.env.MONGODB_URI || defaults.mongoDB,
    port: global.process.env.PORT || defaults.port
};

export default config;