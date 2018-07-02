import AuthenticationStrategy from "./AuthenticationStrategy";
import AuthenticationService from '../AuthenticationService'
import PassportFacebook from 'passport-facebook'

export default class FacebookStrategy extends AuthenticationStrategy {

  public static readonly PROVIDER_NAME: string = 'facebook'

  constructor(config: { scope, route, clientID, clientSecret, callbackURL, profileFields }, service: AuthenticationService) {
    super(
      new PassportFacebook.Strategy(config, service.login.bind(service)), 
      config.scope, 
      config.route, 
      FacebookStrategy.PROVIDER_NAME
    )
  }
}
