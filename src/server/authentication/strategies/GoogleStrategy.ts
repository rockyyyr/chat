import PassportGoogle from 'passport-google-oauth20'
import AuthenticationStrategy from "./AuthenticationStrategy"
import AuthenticationService from '../AuthenticationService'

export default class GoogleStrategy extends AuthenticationStrategy {

  public static readonly PROVIDER_NAME: string = 'google'

  constructor(config: { scope, route, clientID, clientSecret, callbackURL }, service: AuthenticationService) {
    super(
      new PassportGoogle.Strategy(config, service.login.bind(service)),
      config.scope,
      config.route,
      GoogleStrategy.PROVIDER_NAME
    )
  }
}
