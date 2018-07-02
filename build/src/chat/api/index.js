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
const MessageService_1 = __importDefault(require("../messages/MessageService"));
const SecuredEndpoints_1 = __importDefault(require("../../server/SecuredEndpoints"));
const database_1 = __importDefault(require("../../database"));
const events_1 = require("../events");
const Endpoints_1 = __importDefault(require("../../server/Endpoints"));
const event = new events_1.InitializeEvent(new database_1.default());
const service = new MessageService_1.default(new database_1.default());
const secured = new SecuredEndpoints_1.default();
exports.secured = secured;
const unsecured = new Endpoints_1.default();
exports.unsecured = unsecured;
unsecured.router.get('/chat', (req, res) => {
    res.sendFile('index.html', { root: './view/chat' });
});
unsecured.router.get('/login', (req, res) => {
    res.sendFile('index.html', { root: './view/login' });
});
secured.router.get('/chat/init', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (req.user) {
            const response = yield event.handle({ userId: req.user.userId });
            res.json(response);
        }
        else {
            res.send(new Error('no user'));
        }
    }
    catch (err) {
        next(err);
    }
}));
secured.router.get('/chat/:chatId/messages', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const chatId = req.params.chatId;
    try {
        const result = yield service.getMessagesFromChat(chatId);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
}));
//# sourceMappingURL=index.js.map