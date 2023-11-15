const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        boardNo: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: true,
          comment: '게시물 번호',
        },
        userNo: {
          type: Sequelize.INTEGER,
          allowNull: true,
          comment: '회원 번호',
        },
        content: {
          type: Sequelize.STRING(300),
          allowNull: true,
          comment: '게시물 내용',
        },
        boardPw: {
          type: Sequelize.INTEGER,
          allowNull: true,
          comment: '게시물 비밀번호',
        },
      },
      {
        sequelize,
        modelName: 'Board',
        tableName: 'Board',
        schema: 'study',
        timestamps: true,
        paranoid: true,
      }
    );
  }

  // static associate(db) {
  //   Board.belongsTo(db.User, { foreignKey: 'userNo', targetKey: 'userNo' });
  // }
}
