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
class ChatService {
    constructor(database) {
        this.TABLE = database_1.default.tables.chats;
        this.database = database;
    }
    getChats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.instance
                .select()
                .where('userId', userId)
                // .orWhere('user2', userId)
                .from(this.TABLE);
        });
    }
    getChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.database.instance
                .select()
                .where('chatId', chatId)
                .from(this.TABLE);
        });
    }
}
exports.default = ChatService;
//# sourceMappingURL=ChatService.js.map