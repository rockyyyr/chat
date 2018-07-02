"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', { error: err });
    console.log(err);
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map