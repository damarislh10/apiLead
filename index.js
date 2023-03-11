const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const conn = require("express-myconnection");
const { connection } = require("./config.db.js");
const routesGeneral = require("./routes/lead.routes");
const upload = require('express-fileupload')
const app= express();

// 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(conn(mysql, connection, "pool"));
app.use(cors());
app.use(upload())

app.use("/", routesGeneral);

app.listen(process.env.PORT || 3300, () => {
    console.log("server running on port","3300", "🚀"); 
})

module.exports = app;