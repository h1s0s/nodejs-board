const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
        {
            userNo: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                comment: '회원 번호',
            },
            id: {
                type: Sequelize.STRING(15),
                allowNull: true,
                comment: '회원 아이디',
            },
            password: {
                type: Sequelize.STRING(15),
                allowNull: true,
                comment: '회원 비밀번호',
            },
            nickname: {
                type: Sequelize.STRING(15),
                allowNull: true,
                comment: '회원 닉네임',
            }
        }, {
            sequelize,              // static init의 매개변수와 연결되는 옵션, model/index.js에서 연결
            modelName: 'User',
            tableName: 'User',
            schema: 'study',
            timestamps: true,
            paranoid: true,
        });
    };
    // static associate(db) {
    //     db.User.hasMany(db.Board, {sourceKey:'userNo'});
    // }
};