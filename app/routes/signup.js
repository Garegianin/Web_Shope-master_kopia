module.exports = (router, productsLoader) => {
    router.get('/signup', async ctx => {
        const products = await productsLoader.all()
        ctx.state.model = {
            title:'signup',
            products: products
        }
        await ctx.render('signup');
    })
}