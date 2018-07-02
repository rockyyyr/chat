import Chat from './Chat'
import Database from "../../database";

export default class ChatService {

  private readonly TABLE: string = Database.tables.chats
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  public async getChats(userId: string): Promise < Chat[] > {
    return await this.database.instance
      .select()
      .where('userId', userId)
      // .orWhere('user2', userId)
      .from(this.TABLE)
  }

  public async getChat(chatId: string): Promise < Chat > {
    return await this.database.instance
      .select()
      .where('chatId', chatId)
      .from(this.TABLE)
  }
}
