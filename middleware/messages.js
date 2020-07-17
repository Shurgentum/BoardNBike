const { Router } = require("express")
const router = Router()


router.use((req, res, next) => {
    var _render = res.render
    res.render = function (view, options, callback) {
        if (req.session) {
            if (req.session.messages) {
                res.locals.messages = [...req.session.messages]
                req.session.messages = []
            }
        }
        _render.call(this, view, options, callback)
    }
    next()
})

exports.messages_middleware = router
