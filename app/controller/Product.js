//'use strict'

//const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken')

//const response = require('./../response')
const db = require('./../../settings/db')

exports.getAllProduct = (req, res) => {

    db.query('SELECT * FROM `product`', (error, rows, fields) => {
        if(error) {
            response.status(400, error, res)
        } else {
            response.status(200, rows, res)
        }
    })

}

exports.signin = (req, res) => {

    db.query("SELECT * FROM `product` WHERE `id` = '" + req.body.plug + "'", (error, rows, fields) => {
        if(error) {
            response.status(400, error, res)
            return;
        }
        const row = JSON.parse(JSON.stringify(rows))
        row.map(rw => {
            const plug = req.body.plug
            if(password) {
                //Если true мы пускаем юзера и генерируем токен
                const token = jwt.sign({
                    userId: rw.id,
                    email: rw.email
                }, config.jwt, { expiresIn: 120 * 120 })

                response.status(200, {token: `Bearer ${token}`}, res)

            } else {
                //Выкидываем ошибку что пароль не верный
                response.status(401, {message: `Товар отс.`}, res)

            }
            return true
        })

    })

}