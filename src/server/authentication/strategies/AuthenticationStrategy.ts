import Passport from 'passport'

export default class AuthenticationStrategy {

  public readonly NAME: string
  public readonly ROUTE: string
  public readonly SCOPE: string[]

  private strategy: Passport.Strategy

  constructor(strategy: Passport.Strategy, scope: string[], route: string, name: string) {
    this.strategy = strategy
    this.SCOPE = scope
    this.ROUTE = route
    this.NAME = name
  }

  public apply(): Passport.Strategy {
    return this.strategy
  }

}
