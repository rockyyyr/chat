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
const database_1 = __importDefault(require("../../database"));
const lodash_1 = __importDefault(require("lodash"));
class MessageService {
    constructor(database) {
        this.TABLE = database_1.default.tables.messages;
        this.database = database;
    }
    saveMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            message = this.sanitizeMessage(message);
            console.log(message);
            return this.database.instance
                .insert(message)
                .into(this.TABLE);
        });
    }
    getMessagesFromChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.database.instance
                .select()
                .where('chatId', chatId)
                .from(this.TABLE);
        });
    }
    getConversation(chat) {
        return __awaiter(this, void 0, void 0, function* () {
            let messages;
            try {
                messages = yield this.getMessagesFromChat(chat.getChatId());
            }
            catch (err) {
            }
            return Object.assign({}, chat, { messages });
        });
    }
    sanitizeMessage(message) {
        const sanitized = lodash_1.default.escape(message.content);
        return message.setContent(sanitized);
    }
}
exports.default = MessageService;
//# sourceMappingURL=MessageService.js.map