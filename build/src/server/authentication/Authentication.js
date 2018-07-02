"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const JsonWebToken_1 = __importDefault(require("./util/JsonWebToken"));
class Authentication {
    constructor(config, server) {
        server.use(passport_1.default.initialize());
        this.server = server;
        this.config = config;
    }
    initialize() {
        return passport_1.default.initialize;
    }
    addStrategy(strategy) {
        passport_1.default.use(strategy.apply());
        this.server.router().get(this.route(strategy), passport_1.default.authenticate(strategy.NAME, { scope: strategy.SCOPE, session: false }));
        this.server.router().get(this.route(strategy, '/callback'), (req, res, next) => {
            passport_1.default.authenticate(strategy.NAME, (err, user) => {
                if (err) {
                    res.redirect(this.route(strategy));
                    console.log(err);
                }
                if (!user) {
                    next(new Error('User is undefined'));
                }
                const token = JsonWebToken_1.default.create({
                    id: user.getUserId(),
                    accessToken: user.accessToken
                });
                res.redirect(`${this.config.routes.redirects.successRedirect}/?token=${token}`);
            })(req, res, next);
        });
        return this;
    }
    routes() {
        return this.server.router();
    }
    route(strategy, extension = '') {
        return this.config.routes.prefix + '/' + strategy.NAME + extension;
    }
}
exports.default = Authentication;
//# sourceMappingURL=Authentication.js.map