module.exports = (router, productsLoader) => {
    router.get('/login', async ctx => {
        const products = await productsLoader.all()
        ctx.state.model = {
            title:'login',
            products: products
        }
        await ctx.render('login');
    })
}