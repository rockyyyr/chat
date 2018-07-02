import SocketEvent from '../../server/sockets/SocketEvent'
import Database from '../../database'
import Message from './Message'
import MessageService from './MessageService'
import MessageFactory from './MessageFactory';

export class MessageEvent implements SocketEvent {
  
  public readonly name: string
  private service: MessageService

  constructor(database: Database, eventName: string = 'message') {
    this.name = eventName
    this.service = new MessageService(database)
  }

  public async handle(data: any): Promise < any > {
    let message: Message = MessageFactory.buildMessage(data)

    try {
      await this.service.saveMessage(message)

    } catch (err) {
      throw err
    }
    return message
  }

}
