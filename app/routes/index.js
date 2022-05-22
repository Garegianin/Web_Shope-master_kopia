module.exports = (router, productsLoader) => {
    require('./home')(router, productsLoader)
    require('./shop')(router, productsLoader)
    require('./buy')(router, productsLoader)
    require('./login')(router, productsLoader)
    require('./signup')(router, productsLoader)
    require('./profile')(router, productsLoader)
    require('./donate')(router)
}