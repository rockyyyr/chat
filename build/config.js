"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    server: {
        port: process.env.PORT || 3000,
        logging: false,
        cors: {}
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET,
        routes: {
            prefix: '/auth',
            redirects: {
                successRedirect: '/chat',
                failureRedirect: '/error',
            }
        },
        google: {
            route: '/auth/google',
            scope: ['email'],
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        facebook: {
            route: '/auth/facebook',
            scope: ['email'],
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'email', 'name', 'picture']
        }
    }
};
//# sourceMappingURL=config.js.map