"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function clientview(req, res, next) {
    res.sendFile('index.html', { root: './view' });
}
exports.clientview = clientview;
//# sourceMappingURL=clientview.js.map