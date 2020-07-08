const { Router, request } = require("express")
const router = Router()

class Message {
    constructor(type, headline, text) {
        this.type = type,
            this.headline = headline,
            this.text = text
    }
}

class Messages {
    static send(request, type, headline, text) {
        if (request.session.messages) {
            request.session.messages.push(new Message(type, headline, text))
        } else {
            request.session.messages = [new Message(type, headline, text)]
        }
    }
}

router.use((req, res, next) => {
    req.messages = Messages
    if (req.session.messages) {
        res.locals.messages = req.session.messages
    } else {
        res.locals.messages = []
    }
    next()
})

exports.messages_middleware = router
