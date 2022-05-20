module.exports = (router, productsLoader) => {
    require('./home')(router, productsLoader)
    require('./shop')(router, productsLoader)
    require('./buy')(router, productsLoader)
    require('./profile')(router, productsLoader)
    require('./donate')(router)
}