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
const socket_io_1 = __importDefault(require("socket.io"));
class Socket {
    constructor(server) {
        this.emitResponse = (event, data) => {
            this.io.emit(event, data);
        };
        this.broadcastResponse = (event, data, client) => {
            client.broadcast.emit(event, data);
        };
        this.io = socket_io_1.default(server.instance());
    }
    emit(emitEvents) {
        this.emitEvents = emitEvents;
        return this;
    }
    broadcast(broadcastEvents) {
        this.broadcastEvents = broadcastEvents;
        return this;
    }
    start() {
        this.io.on('connection', client => {
            this.handleConnection(client);
            if (this.emitEvents) {
                this.handleEvents(this.emitEvents, client, this.emitResponse);
            }
            if (this.broadcastEvents) {
                this.handleEvents(this.broadcastEvents, client, this.broadcastResponse);
            }
        });
    }
    handleEvents(events, client, respondWith) {
        events.forEach(event => {
            client.on(event.name, (data) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield event.handle(data);
                    respondWith(event.name, result, client);
                }
                catch (err) {
                    this.emitError(err.message);
                    console.log(err);
                }
            }));
        });
    }
    handleConnection(client) {
        console.log(`new connection: ${client.id}`);
    }
    emitError(err) {
        return this.io.emit('error', err);
    }
}
exports.default = Socket;
//# sourceMappingURL=Socket.js.map