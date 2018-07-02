"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./middleware");
class SecuredEndpoints {
    constructor(pathPrefix = '') {
        this.prefix = pathPrefix;
        this.router = express_1.default.Router();
        this.baseRouter = express_1.default.Router();
        this.baseRouter.use(pathPrefix, middleware_1.authenticate, this.router);
    }
    routes() {
        return this.baseRouter;
    }
}
exports.default = SecuredEndpoints;
//# sourceMappingURL=SecuredEndpoints.js.map