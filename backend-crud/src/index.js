const express = require("express");
const cors = require('cors');
const app = express();
const sequelize = require("./config/database")
const Routes = require("./routes/index-routes")

sequelize.sync().then(() => console.log("Banco de Dados conectado com sucesso ✅"));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    app.use(cors());
    next();
})

app.use(express.json());
app.use("/api/", Routes);

app.listen(3000, () => {
    console.log("Server started on port 3000 🔥");
})