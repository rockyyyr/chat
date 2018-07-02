"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const User_1 = __importDefault(require("./User"));
const UserFactory_1 = __importDefault(require("./UserFactory"));
class UserService {
    constructor(database) {
        this.TABLE = database_1.default.tables.users;
        this.database = database;
    }
    /**
     * Create a RegisteredUser and save it to the database
     *
     * @param user User object to create
     */
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = yield this.database.instance.insert(user).into(this.TABLE);
                const registeredUser = yield this.database.instance.select().where('userId', userId).from(this.TABLE);
                return new User_1.default(registeredUser[0]);
            }
            catch (err) {
                throw err;
            }
        });
    }
    login(accessToken, refreshToken, profile, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('logging in...');
            let user;
            try {
                user = yield this.getUserByEmail(profile.emails[0].value);
                if (user) {
                    user = yield this.setUserAccessToken(user, accessToken);
                }
                else {
                    user = yield this.registerUser(UserFactory_1.default.OauthProfile(profile));
                }
            }
            catch (err) {
                console.log(err);
                callback(err);
            }
            return callback(null, user);
        });
    }
    setUserAccessToken(user, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            user.setAccessToken(accessToken);
            try {
                yield this.database.instance(this.TABLE).where('email', user.getEmail()).update(user);
            }
            catch (err) {
                throw err;
            }
            return user;
        });
    }
    getUsers(userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield this.database.instance(this.TABLE)
                    .select()
                    .where(builder => builder.whereIn('userId', userIds));
                response = response.map(user => new User_1.default(user));
            }
            catch (err) {
                throw err;
            }
            return response;
        });
    }
    /**
     * Return a RegisteredUser by their userId
     *
     * @param userId userId to search for
     * @return a RegisteredUser object or false if no user was found
     */
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.lookupUser('userId', userId);
        });
    }
    /**
     * Return a RegisteredUser by their email
     *
     * @param email email to search for
     * @return a RegisteredUser object or false if no user was found
     */
    getUserByEmail(email) {
        return this.lookupUser('email', email);
    }
    /**
     * Return a RegisteredUser from the database by the key specified
     *
     * @param key the column to query by
     * @param value the value of the column to search for
     * @return a RegisteredUser object or false if no user was found
     */
    lookupUser(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let users;
            try {
                users = yield this.database.instance.select().where(key, value).from(this.TABLE);
            }
            catch (err) {
                throw err;
            }
            return this.foundUser(users);
        });
    }
    /**
     * Check if a user was returned from the database
     *
     * @param users resulting array returned from the database
     * @return a RegisteredUser or false if no user was found
     */
    foundUser(users) {
        let result;
        if (users.length > 0) {
            result = new User_1.default(users[0]);
        }
        else {
            result = false;
        }
        return result;
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map