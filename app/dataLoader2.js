const path = require('path')
const fs = require('fs-extra')
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "mydb",
    password: "root"
});


//Поле эксперементов
function fileInfo(fileName) {
    return {
        slug: fileName.substr(0, fileName.indexOf('.json')),
        //name: fileName,
        //path: path.join(dir, fileName)
    }
}

// moiGovnoSait/shop/1


/*
function fileInfo(fileName, dir) {
    return {
        slug: fileName.substr(0, fileName.indexOf('.json')),
        name: fileName,
        path: path.join(dir, fileName)
    }
}
*/

//Поле эксперементов
function readFile(fileInfo) {
    return fs
        .readJson(fileInfo.path)
                .then(content => Object.assign(content, { _slug: fileInfo.slug }))
}

/*
function readFile(fileInfo) {
    return fs
        .readJson(fileInfo.path)
        .then(content => Object.assign(content, { _slug: fileInfo.slug }))
}
*/


function open()
{
    connection.connect(function (err) {
        if (err) {
            return console.error("Ошибка: " + err.message);
        } else {
            console.log("Подключение к серверу MySQL успешно установлено");
        }
    });
}




class DataLoader2 {
    constructor() {
        open();
    }



    //всё
    async all() {
        const result = await connection.query("SELECT * FROM product",
            function (err, results, fields) {
                console.log(err);
                console.log(results); // собственно данные
                results.map(result=> Object.assign(result, {_slug: results.idproduct}))
            });
        return Promise.all(result)
    }



    async all2() {
        const fileInfos = (await fs.readdir(this.dir)).map(fileName => fileInfo(fileName, this.dir))
        return Promise.all(fileInfos.map(readFile))
    }


    //Один
    async single(slug) {
        const result = await connection.query("SELECT * FROM product where idproducts = "+slug,
                function (err, results, fields) {
                    console.log(err);
                    console.log(results); // собственно данные
                })
        return result ? readFile(result) : null
    }



    async single2(slug) {
        const fileInfos = (await fs.readdir(this.dir)).map(fileName => fileInfo(fileName, this.dir))
        var found = fileInfos.find(file => file.slug === slug)
        return found ? readFile(found) : null
    }
}

let db = new DataLoader2();
console.log(db.all());



module.exports = DataLoader2