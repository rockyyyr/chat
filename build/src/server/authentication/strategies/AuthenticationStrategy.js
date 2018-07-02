"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticationStrategy {
    constructor(strategy, scope, route, name) {
        this.strategy = strategy;
        this.SCOPE = scope;
        this.ROUTE = route;
        this.NAME = name;
    }
    apply() {
        return this.strategy;
    }
}
exports.default = AuthenticationStrategy;
//# sourceMappingURL=AuthenticationStrategy.js.map