"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('./knexfile.js');
const knex_1 = __importDefault(require("knex"));
class Database {
    constructor() {
        this.instance = knex_1.default(config[process.env.NODE_ENV]);
    }
}
Database.tables = {
    messages: 'messages',
    users: 'users',
    chats: 'chats'
};
exports.default = Database;
//# sourceMappingURL=Database.js.map