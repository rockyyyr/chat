import Passport from 'passport'
import Server from '../Server'
import AuthenticationStrategy from './strategies/AuthenticationStrategy';
import JsonWebToken from './util/JsonWebToken';

export default class Authentication {

  private server: Server
  private config: { routes }

  constructor(config: { routes }, server: Server) {
    server.use(Passport.initialize())
    this.server = server
    this.config = config
  }

  public initialize() {
    return Passport.initialize
  }

  public addStrategy(strategy: AuthenticationStrategy): Authentication {
    Passport.use(strategy.apply())

    this.server.router().get(this.route(strategy),
      Passport.authenticate(strategy.NAME, { scope: strategy.SCOPE, session: false }))

    this.server.router().get(this.route(strategy, '/callback'), (req, res, next) => {
      Passport.authenticate(strategy.NAME, (err, user) => {
        if (err) {
          res.redirect(this.route(strategy))
          console.log(err)
        }

        if(!user) {
          next(new Error('User is undefined'))
        }

        const token: string = JsonWebToken.create({
          id: user.getUserId(),
          accessToken: user.accessToken
        })

        res.redirect(`${this.config.routes.redirects.successRedirect}/?token=${token}`)

      })(req, res, next)
    })

    return this
  }

  public routes() {
    return this.server.router()
  }

  private route(strategy: AuthenticationStrategy, extension: string = '') {
    return this.config.routes.prefix + '/' + strategy.NAME + extension
  }

}
