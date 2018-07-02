"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor({ userId, firstName, lastName, email, joinedDate, imageUrl }) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.joinedDate = joinedDate;
        this.imageUrl = imageUrl;
    }
    getUserId() {
        return this.userId;
    }
    getEmail() {
        return this.email;
    }
    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map