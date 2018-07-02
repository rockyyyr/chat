import SocketIO from 'socket.io'
import Server from '../Server';
import SocketEvent from './SocketEvent';

export default class Socket {

  private io: SocketIO.Server
  private emitEvents: SocketEvent[]
  private broadcastEvents: SocketEvent[]

  constructor(server: Server) {
    this.io = SocketIO(server.instance())
  }

  public emit(emitEvents: SocketEvent[]): Socket {
    this.emitEvents = emitEvents
    return this
  }

  public broadcast(broadcastEvents: SocketEvent[]): Socket {
    this.broadcastEvents = broadcastEvents
    return this
  }

  public start(): void {
    this.io.on('connection', client => {
      this.handleConnection(client)

      if (this.emitEvents) {
        this.handleEvents(this.emitEvents, client, this.emitResponse)
      }

      if (this.broadcastEvents) {
        this.handleEvents(this.broadcastEvents, client, this.broadcastResponse)
      }

    })
  }

  private handleEvents(events: SocketEvent[], client: SocketIO.Socket, respondWith: Function) {
    events.forEach(event => {
      client.on(event.name, async data => {

        try {
          const result = await event.handle(data)
          respondWith(event.name, result, client)

        } catch (err) {
          this.emitError(err.message)
          console.log(err)

        }
      })
    })
  }

  private emitResponse = (event: string, data: any): void => {
    this.io.emit(event, data)
  }

  private broadcastResponse = (event: string, data: any, client: SocketIO.Socket): void => {
    client.broadcast.emit(event, data)
  }

  private handleConnection(client: SocketIO.Socket): void {
    console.log(`new connection: ${client.id}`)
  }

  private emitError(err: any) {
    return this.io.emit('error', err)
  }
}
