"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageService_1 = __importDefault(require("./MessageService"));
const MessageFactory_1 = __importDefault(require("./MessageFactory"));
class MessageEvent {
    constructor(database, eventName = 'message') {
        this.name = eventName;
        this.service = new MessageService_1.default(database);
    }
    handle(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = MessageFactory_1.default.buildMessage(data);
            try {
                yield this.service.saveMessage(message);
            }
            catch (err) {
                throw err;
            }
            return message;
        });
    }
}
exports.MessageEvent = MessageEvent;
//# sourceMappingURL=MessageEvent.js.map