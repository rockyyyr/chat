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
const ChatService_1 = __importDefault(require("../chats/ChatService"));
const UserService_1 = __importDefault(require("../users/UserService"));
const MessageService_1 = __importDefault(require("../messages/MessageService"));
const Chat_1 = __importDefault(require("../chats/Chat"));
class InitializeEvent {
    constructor(database, eventName = 'initialize') {
        this.name = eventName;
        this.chatService = new ChatService_1.default(database);
        this.userService = new UserService_1.default(database);
        this.messageService = new MessageService_1.default(database);
    }
    handle(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let chats;
            let contacts;
            let user;
            console.log(data);
            try {
                user = yield this.userService.getUser(data.userId);
                chats = yield this.chatService.getChats(data.userId);
                chats = chats.map(x => new Chat_1.default(x));
                contacts = yield this.userService
                    .getUsers(chats
                    .map(x => x.recipient));
            }
            catch (err) {
                throw err;
            }
            return { user, chats, contacts };
        });
    }
}
exports.InitializeEvent = InitializeEvent;
//# sourceMappingURL=InitializeEvent.js.map