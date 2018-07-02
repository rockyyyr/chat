"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor({ chatId, userId, content, timestamp }) {
        this.chatId = chatId;
        this.userId = userId;
        this.content = content;
        this.timestamp = timestamp;
    }
    setContent(content) {
        this.content = content;
        return this;
    }
}
exports.default = Message;
//# sourceMappingURL=Message.js.map