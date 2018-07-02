"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const AuthenticationStrategy_1 = __importDefault(require("./AuthenticationStrategy"));
class GoogleStrategy extends AuthenticationStrategy_1.default {
    constructor(config, service) {
        super(new passport_google_oauth20_1.default.Strategy(config, service.login.bind(service)), config.scope, config.route, GoogleStrategy.PROVIDER_NAME);
    }
}
GoogleStrategy.PROVIDER_NAME = 'google';
exports.default = GoogleStrategy;
//# sourceMappingURL=GoogleStrategy.js.map