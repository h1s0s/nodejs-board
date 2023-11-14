const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            userNo : {
                type : Int16Array,
                allowNull: true,
                unique: true
            },
            id : {
                type: Sequelize.STRING(15),
                allowNull: true,
                unique: true
            },
            password : {
                type: Sequelize.STRING(15),
                allowNull: true
            },
            nickname : {
                type: Sequelize.STRING(15),
                allowNull: true,
                unique: true
            }
        })

    }
}