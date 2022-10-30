const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    {
        dialect: 'mysql',
        host: 'localhost',
        username: 'root',
        password: '987654321',
        database: 'teste',
        define: {
            timestamp: true,
            underscored: true,
        }
    }
);

module.exports = sequelize;

sequelize.authenticate().then(() => {
    console.log('conexão foi estabelecida com sucesso. ✅');
}).catch((error) => {
    console.error('Não foi possível conectar ao banco de dados: 👾', error);
});