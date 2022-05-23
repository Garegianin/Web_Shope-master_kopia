const config = require('config')
const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const loadRoutes = require("./app/routes")
const DataLoader = require('./app/dataLoader')
const views = require('koa-views')
const serve = require('koa-static')
const fs = require('fs');
const app = new Koa()
const router = new Router()













const mysql = require("mysql");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "osemenitel",
  password: "ZTrEycaMgno6pzd4FpgM"
});



connection.connect();

connection.query('select * from product;', function(err, results, fields) {
  if(err) throw err;
  results.map(result => {
    fs.writeFile(path.join(
        __dirname,
        config.get('data.path'),
        'products/')+result.id+'.json', JSON.stringify(results[0]), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

  })

  connection.end();
});










// Загрузчик данных для продуктов (считывает файлы JSON)
const productsLoader = new DataLoader(
  path.join(
    __dirname,
    config.get('data.path'),
    'product')
)

// Просмотр настройки, добавляет функцию render() к объекту ctx
app.use(views(
  path.join(__dirname, config.get('views.path')),
  config.get('views.options')
))



// Статические файлы сервера (скрипты, css, изображения)
app.use(serve(config.get('static.path')))

// Измените ctx.state с глобальными настройками, чтобы сделать их доступными в представлениях
app.use(async (ctx, next) => {
  ctx.state.settings = config.get('settings')
  ctx.state.urlWithoutQuery = ctx.origin + ctx.path
  await next()
})

// Настройка маршрутизатора
loadRoutes(router, productsLoader)
app.use(router.routes())

// Запуск
const port = process.env.PORT || config.get('server.port')
app.listen(port,
    () => { console.log(`Application started - listening on port ${port}`) })


