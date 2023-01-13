const Sequelize = require('sequelize');
const logger = require('../loggers/logger')

const sequelize = new Sequelize('sequelize-node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})
sequelize.authenticate()
    .then(() => {
        logger.info('Database Conected');
    })
    .catch(err => {
        logger.info('error', err);
    });


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../model/UserModel')(sequelize, Sequelize);
db.addressBook = require('../model/addressBook')(sequelize, Sequelize);

db.sequelize.sync()
    .then(() => {
        logger.info('yes re-sync');
    })
module.exports = db;