import SocketEvent from "../../server/sockets/SocketEvent"
import Database from "../../database"
import ChatService from "../chats/ChatService"
import UserService from '../users/UserService'
import MessageService from '../messages/MessageService'
import Chat from "../chats/Chat";

export class InitializeEvent implements SocketEvent {

  public readonly name: string

  private chatService: ChatService
  private userService: UserService
  private messageService: MessageService

  constructor(database: Database, eventName: string = 'initialize') {
    this.name = eventName
    this.chatService = new ChatService(database)
    this.userService = new UserService(database)
    this.messageService = new MessageService(database)
  }

  public async handle(data: any): Promise < any > {
    let chats
    let contacts
    let user

    console.log(data)
    

    try {
      user = await this.userService.getUser(data.userId)
      chats = await this.chatService.getChats(data.userId)
      chats = chats.map(x => new Chat(x))

      contacts = await this.userService
        .getUsers(chats
            .map(x => x.recipient))

    } catch (err) {
      throw err
    }
    return { user, chats, contacts }
  }

}
