const { Router } = require("express")
const router = Router()


router.use((req, res, next) => {
    next()
})
module.exports.user_middleware = router
