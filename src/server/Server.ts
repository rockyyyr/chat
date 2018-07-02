import Http from 'http'
import Express from 'express'
import Cors from 'cors'
import BodyParser from 'body-parser'
import Logger from 'morgan'
import Endpoints from './Endpoints'
import SecuredEndpoints from './SecuredEndpoints'

/**
 * Server. Launch a webserver backed by express.js. Includes static file serving and
 * runs with default middleware including logging, Cors and BodyParser
 */
export default class Server {

  private http: Http.Server
  private express: Express.Express
  private port: string | number
  private config: { port, cors, logging }

  constructor(config: { port, cors, logging }) {
    this.express = Express()
    this.port = config.port
    this.config = config
    this.http = Http.createServer(this.express)
  }

  /**
   * @return this Server's internal http instance
   */
  public instance(): Http.Server {
    return this.http
  }


  /**
   * Return this Server's router
   */
  public router(): Express.Router {
    return this.express._router
  }

  /**
   * Initialize the server with default middleware.
   * 
   * This includes Cors, with optional options and BodyParser.
   * In development, Morgan is also included.
   * 
   * This should be called before adding Endpoints or error handling middleware
   * 
   * @return this Server instance
   */
  public init(): Server {
    if (process.env.NODE_ENV === 'development' && this.config.logging) {
      this.express.use(Logger('dev'))
    }
    this.express.use(Cors(this.config.cors))
    this.express.use(BodyParser.json())

    return this
  }

  /**
   * Add middleware to the middleware stack
   * 
   * @param middleware middleware to add to the middleware stack
   * @return this Server instance
   */
  public use(middleware: Express.RequestHandler | Express.ErrorRequestHandler): Server {
    this.express.use(middleware)

    return this
  }

  /**
   * Serve static files from a specified directory
   *  
   * @param path path to serve files from
   */
  public serve(path: string): Server {
    this.express.use(Express.static(path))

    return this
  }

  /**
   * Add Endpoints to the server's internal router.
   * 
   * This should be called after server initialization
   * and after adding autorization strategies.
   * 
   * @param endpoints the Endpoints object to add to the server's router
   * @return this Server instance 
   */
  public endpoints(endpoints: Endpoints | SecuredEndpoints): Server {
    this.express.use(endpoints.routes())

    return this
  }

  /**
   * Start this Server
   */
  public start(): void {
    this.http.listen(this.port, () => console.log('listening on port', this.port))
  }
}
