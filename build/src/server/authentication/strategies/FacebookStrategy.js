"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationStrategy_1 = __importDefault(require("./AuthenticationStrategy"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
class FacebookStrategy extends AuthenticationStrategy_1.default {
    constructor(config, service) {
        super(new passport_facebook_1.default.Strategy(config, service.login.bind(service)), config.scope, config.route, FacebookStrategy.PROVIDER_NAME);
    }
}
FacebookStrategy.PROVIDER_NAME = 'facebook';
exports.default = FacebookStrategy;
//# sourceMappingURL=FacebookStrategy.js.map