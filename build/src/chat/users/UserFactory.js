"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const GoogleStrategy_1 = __importDefault(require("../../server/authentication/strategies/GoogleStrategy"));
const FacebookStrategy_1 = __importDefault(require("../../server/authentication/strategies/FacebookStrategy"));
class UserFactory {
    static OauthProfile(profile) {
        switch (profile.provider) {
            case GoogleStrategy_1.default.PROVIDER_NAME:
                return UserFactory.googleProfile(profile);
            case FacebookStrategy_1.default.PROVIDER_NAME:
                return UserFactory.facebookProfile(profile);
            default:
                throw {
                    status: 422,
                    message: `Oauth provider not supported: ${profile.prodiver}`
                };
        }
    }
    static googleProfile(profile) {
        return new User_1.default({
            userId: null,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            joinedDate: Date.now().toString(),
            imageUrl: profile.photos[0].value
        });
    }
    static facebookProfile(profile) {
        return null;
    }
}
exports.default = UserFactory;
//# sourceMappingURL=UserFactory.js.map