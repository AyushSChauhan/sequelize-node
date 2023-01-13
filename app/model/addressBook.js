const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("addressBook", {
        Title: {
            type: Sequelize.STRING
        },

        addressLine1: {
            type: Sequelize.STRING

        },

        addressLine2: {
            type: Sequelize.STRING
        },

        Country: {
            type: Sequelize.STRING,
            enum: ['India', 'Australia', 'Canada', 'Japan']
        },

        State: {
            type: Sequelize.STRING,
            enum: ['Gujarat', 'Rajasthan', 'Punjab', 'Assam']
        },

        City: {
            type: Sequelize.STRING,
            enum: ['Ahmedabad', 'Junagadh', 'Surat', 'Bhuj']

        },
        PinCode: {
            type: Sequelize.INTEGER
        }


    }, { freeZeTableName: true, timestamps: false });

}