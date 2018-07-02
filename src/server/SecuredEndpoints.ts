import Express from 'express'
import { authenticate } from './middleware'

export default class SecuredEndpoints {

  public readonly prefix: string

  private baseRouter: Express.Router
  public router: Express.Router

  constructor(pathPrefix: string = '') {
    this.prefix = pathPrefix
    this.router = Express.Router()

    this.baseRouter = Express.Router()
    this.baseRouter.use(pathPrefix, authenticate, this.router)
  }

  public routes(): Express.Router {
    return this.baseRouter
  }
}
