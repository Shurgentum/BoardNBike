class Message {
    constructor(type, headline, text) {
        this.type = type
        this.headline = headline
        this.text = text
    }
}

class Messages {
    static send(request, type, headline, text) {
        if (request.session) {
            if (request.session.messages) {
                request.session.messages.push(new Message(type, headline, text))
            } else {
                request.session.messages = [new Message(type, headline, text)]
            }
        }
    }
}

exports.Messages = Messages
exports.Message = Message
