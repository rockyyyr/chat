export default interface SocketEvent {

  readonly name: string
  
  handle(data: any): {}

}
