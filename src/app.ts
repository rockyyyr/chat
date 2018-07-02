import Config from '../config'
import Database from './database'
import Server from './server/Server'
import Socket from './server/sockets/Socket'
import SocketEvent from './server/sockets/SocketEvent';
import Authentication from './server/authentication/Authentication';
import AuthenticationService from './server/authentication/AuthenticationService'
import GoogleStrategy from './server/authentication/strategies/GoogleStrategy';
import FacebookStrategy from './server/authentication/strategies/FacebookStrategy';
import { unsecured, secured } from './chat/api'
import UserService from './chat/users/UserService'
import { MessageEvent, InitializeEvent } from './chat/events'

const server: Server = new Server(Config.server)
const socket: Socket = new Socket(server)
const authentication: Authentication = new Authentication(Config.authentication, server)
const database: Database = new Database()
const userService: AuthenticationService = new UserService(database)

const emitEvents: SocketEvent[] = [
  new MessageEvent(database),
  new InitializeEvent(database)
]

authentication
  .addStrategy(new GoogleStrategy(Config.authentication.google, userService))
  .addStrategy(new FacebookStrategy(Config.authentication.facebook, userService))

socket
  .emit(emitEvents)
  .start()

server
  .init()
  .serve('./view')
  .endpoints(unsecured)
  .endpoints(secured)
  .start()
