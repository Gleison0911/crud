const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("../models/categoryModel");

class Medeal extends Model {}

Medeal.init({
    titulo: {
        type: DataTypes.STRING,
    },
    subtitulo: {
        type: DataTypes.STRING,
    },
    category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
    },
    imagem_1: {
        type: DataTypes.STRING,
    },
    imagem_2: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'medals',
    timestamps: false
})

Medeal.belongsTo(Category, { foreignKey: 'category_id', allowNull: false });

// Medeal.sync({ force: true });

module.exports = Medeal;