const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "mydb",
    password: "root"
});
connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});
connection.query("SELECT * FROM products",
    function(err, results, fields) {
        console.log(err);
        console.log(results); // собственно данные
    });


connection.execute("SELECT price FROM products",
    function(err, results, fields) {
        console.log(err);
        console.log(results); // собственно данные

    });

// закрытие подключения
connection.end(function(err) {
    if (err) {
        return console.log("Ошибка: " + err.message);
    }
    console.log("Подключение закрыто");
});