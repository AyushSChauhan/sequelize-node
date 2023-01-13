const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("registration", {
        name: Sequelize.STRING,

        gender: {
            type: Sequelize.STRING,
            enum: ['Male', 'Female', 'Other']
        },

        image: {
            type: Sequelize.STRING
        },

        email: {
            type: Sequelize.STRING,
            defaultValue: 'test@gmail.com'
        },

        password: Sequelize.STRING,



    }, { freeZeTableName: true, timestamps: false });

}