const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const Medal = require("./medalModel");

class Rules extends Model { }

Rules.init({
    titulo: {
        type: DataTypes.STRING,
    },
    descricao: {
        type: DataTypes.STRING,
    },
    medal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    qtyd: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'rules',
    timestamps: false
})

Rules.belongsTo(Medal, { foreignKey: 'medal_id', allowNull: false });

// Rules.sync({ force: true });

module.exports = Rules;