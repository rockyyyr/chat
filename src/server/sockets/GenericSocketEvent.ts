import SocketEvent from "./SocketEvent";

export default class GenericSocketEvent implements SocketEvent {

  public name: string
  public handler: Function

  constructor(eventName: string, handler: Function) {
    this.name = eventName
    this.handler = handler
  }

  public async handle(data: any): Promise < any > {
    return this.handler(data)
  }
}
