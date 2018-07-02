export default class Message {

  public chatId: string
  public userId: string
  public content: string
  public timestamp: number

  constructor({ chatId, userId, content, timestamp }) {
    this.chatId = chatId
    this.userId = userId
    this.content = content
    this.timestamp = timestamp
  }

  public setContent(content: string): Message {
    this.content = content;
    return this
  }

}
