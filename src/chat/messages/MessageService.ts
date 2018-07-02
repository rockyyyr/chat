import Message from './Message'
import Chat from '../chats/Chat'
import Database from "../../database"
import _ from 'lodash'

export default class MessageService {

  private readonly TABLE: string = Database.tables.messages
  private database: Database

  constructor(database: Database) {
    this.database = database;
  }

  public async saveMessage(message: Message): Promise < void > {
    message = this.sanitizeMessage(message)
    console.log(message)
    
    return this.database.instance
      .insert(message)
      .into(this.TABLE)
  }

  public async getMessagesFromChat(chatId: string): Promise < Message[] > {
    return this.database.instance
      .select()
      .where('chatId', chatId)
      .from(this.TABLE)
  }

  public async getConversation(chat: Chat): Promise < any > {
    let messages: Message[]

    try {
      messages = await this.getMessagesFromChat(chat.getChatId())

    } catch (err) {
      
    }
    return {
      ...chat,
      messages
    }
  }

  private sanitizeMessage(message: Message): Message {
    const sanitized = _.escape(message.content)
    return message.setContent(sanitized)
  }

}
