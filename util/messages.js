class Message {
    constructor(type, text) {
        this.type = type
        this.text = text
    }
}

class Messages {
    static send(request, type, text) {
        if (request.session) {
            if (request.session.messages) {
                request.session.messages.push(new Message(type, text))
            } else {
                request.session.messages = [new Message(type, text)]
            }
        }
    }
}

exports.Messages = Messages
exports.Message = Message
