import Express from 'express'

export default class Endpoints {

  public readonly prefix: string

  private baseRouter: Express.Router
  public router: Express.Router

  constructor(pathPrefix ? : string) {
    this.prefix = pathPrefix
    this.router = Express.Router()

    if (pathPrefix) {
      this.baseRouter = Express.Router()
      this.baseRouter.use(pathPrefix, this.router)
    }
  }

  public routes(): Express.Router {
    return this.prefix ? this.baseRouter : this.router
  }
}
