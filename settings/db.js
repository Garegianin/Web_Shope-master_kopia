const mysql = require("mysql2");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "osemenitel",
    password: "ZTrEycaMgno6pzd4FpgM",
    port:3036
});

connection.connect((error) => {
    if(error) {
        return console.log('Ошибка подключения к БД!');
    } else {
        return console.log('Подлючение успешно!');
    }
})

module.exports = connection