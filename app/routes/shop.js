module.exports = (router, productsLoader) => {
    router.get('/shop', async ctx => {
        const products = await productsLoader.all()
        ctx.state.model = {
            title: 'shop',
            products: products
        }
        await ctx.render('shop');
    })
}