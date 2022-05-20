module.exports = (router, productsLoader) => {
    router.get('/profile', async ctx => {
        const products = await productsLoader.all()
        ctx.state.model = {
            title: 'profile',
            products: products
        }
        await ctx.render('profile');
    })
}