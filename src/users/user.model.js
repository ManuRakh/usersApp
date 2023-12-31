const { INTEGER, STRING } = require("sequelize");
const { sequelize } = require("../db");

const UserModel = sequelize.define('User', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true,
    },
    balance: {
        type: INTEGER,
        allowNull: false,
    },
});


module.exports = {
    UserModel
};
