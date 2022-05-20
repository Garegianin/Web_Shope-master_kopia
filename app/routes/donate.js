const config = require('config')

module.exports = router => {
  router.get("/donate", async ctx => {
    ctx.state.model = {
      title: "Донат",
      amount: ctx.query.amount || config.get("settings.defaultDonation")
    }
    await ctx.render('donate')
  })
}