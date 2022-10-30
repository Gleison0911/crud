const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");

class Category extends Model {
}

Category.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subtitulo: {
        type: DataTypes.STRING,
    },
    descricao: {
        type: DataTypes.STRING,
    },
    imagem: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'categories',
    timestamps: false
})

// Category.sync({ force: true });

module.exports = Category;