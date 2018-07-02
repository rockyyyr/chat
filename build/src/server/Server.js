"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
/**
 * Server. Launch a webserver backed by express.js. Includes static file serving and
 * runs with default middleware including logging, Cors and BodyParser
 */
class Server {
    constructor(config) {
        this.express = express_1.default();
        this.port = config.port;
        this.config = config;
        this.http = http_1.default.createServer(this.express);
    }
    /**
     * @return this Server's internal http instance
     */
    instance() {
        return this.http;
    }
    /**
     * Return this Server's router
     */
    router() {
        return this.express._router;
    }
    /**
     * Initialize the server with default middleware.
     *
     * This includes Cors, with optional options and BodyParser.
     * In development, Morgan is also included.
     *
     * This should be called before adding Endpoints or error handling middleware
     *
     * @return this Server instance
     */
    init() {
        if (process.env.NODE_ENV === 'development' && this.config.logging) {
            this.express.use(morgan_1.default('dev'));
        }
        this.express.use(cors_1.default(this.config.cors));
        this.express.use(body_parser_1.default.json());
        return this;
    }
    /**
     * Add middleware to the middleware stack
     *
     * @param middleware middleware to add to the middleware stack
     * @return this Server instance
     */
    use(middleware) {
        this.express.use(middleware);
        return this;
    }
    /**
     * Serve static files from a specified directory
     *
     * @param path path to serve files from
     */
    serve(path) {
        this.express.use(express_1.default.static(path));
        return this;
    }
    /**
     * Add Endpoints to the server's internal router.
     *
     * This should be called after server initialization
     * and after adding autorization strategies.
     *
     * @param endpoints the Endpoints object to add to the server's router
     * @return this Server instance
     */
    endpoints(endpoints) {
        this.express.use(endpoints.routes());
        return this;
    }
    /**
     * Start this Server
     */
    start() {
        this.http.listen(this.port, () => console.log('listening on port', this.port));
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map