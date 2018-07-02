"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Chat {
    constructor({ chatId, userId, recipient }) {
        this.chatId = chatId;
        this.userId = userId;
        this.recipient = recipient;
    }
    getChatId() {
        return this.chatId;
    }
}
exports.default = Chat;
//# sourceMappingURL=Chat.js.map