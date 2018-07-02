"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Endpoints {
    constructor(pathPrefix) {
        this.prefix = pathPrefix;
        this.router = express_1.default.Router();
        if (pathPrefix) {
            this.baseRouter = express_1.default.Router();
            this.baseRouter.use(pathPrefix, this.router);
        }
    }
    routes() {
        return this.prefix ? this.baseRouter : this.router;
    }
}
exports.default = Endpoints;
//# sourceMappingURL=Endpoints.js.map