const Sequelize = require('sequelize');

class Board extends Sequelize.Model {
    static initiate(sequelize) {
        Board.init({
            boardNo : {
                type : Int16Array,
                allowNull: true,
                unique: true
            },
            content : {
                type: Sequelize.STRING(300),
                allowNull: true,
                unique: true
            },
            boardPw : {
                type: Int8Array,
                allowNull: true
            }
        })
    }

    static associate(db) {
        db.Board.hasMany(db.User, { foreignKey: 'userNo', sourceKey: 'boardNo' });
    }
}