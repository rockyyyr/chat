"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("./Message"));
class MessageFactory {
    static buildMessage(data) {
        return new Message_1.default(Object.assign({}, data, { timestamp: MessageFactory.timestamp() }));
    }
    static timestamp() {
        return Date.now();
    }
}
exports.default = MessageFactory;
//# sourceMappingURL=MessageFactory.js.map