export default class SocketClient {
  public data: SocketIO.Socket

  constructor(data: SocketIO.Socket) {
    this.data = data
  }
}
