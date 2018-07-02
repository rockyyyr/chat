"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const database_1 = __importDefault(require("./database"));
const Server_1 = __importDefault(require("./server/Server"));
const Socket_1 = __importDefault(require("./server/sockets/Socket"));
const Authentication_1 = __importDefault(require("./server/authentication/Authentication"));
const GoogleStrategy_1 = __importDefault(require("./server/authentication/strategies/GoogleStrategy"));
const FacebookStrategy_1 = __importDefault(require("./server/authentication/strategies/FacebookStrategy"));
const api_1 = require("./chat/api");
const UserService_1 = __importDefault(require("./chat/users/UserService"));
const events_1 = require("./chat/events");
const server = new Server_1.default(config_1.default.server);
const socket = new Socket_1.default(server);
const authentication = new Authentication_1.default(config_1.default.authentication, server);
const database = new database_1.default();
const userService = new UserService_1.default(database);
const emitEvents = [
    new events_1.MessageEvent(database),
    new events_1.InitializeEvent(database)
];
authentication
    .addStrategy(new GoogleStrategy_1.default(config_1.default.authentication.google, userService))
    .addStrategy(new FacebookStrategy_1.default(config_1.default.authentication.facebook, userService));
socket
    .emit(emitEvents)
    .start();
server
    .init()
    .serve('./view')
    .endpoints(api_1.unsecured)
    .endpoints(api_1.secured)
    .start();
//# sourceMappingURL=app.js.map