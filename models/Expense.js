const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Expense extends Model {}

Expense.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'expense',
    }
);

module.exports = Expense;