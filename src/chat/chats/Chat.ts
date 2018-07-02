export default class Chat {

  private chatId: string
  private userId: string
  private recipient: string

  constructor({chatId, userId, recipient}) {
    this.chatId = chatId
    this.userId = userId
    this.recipient = recipient
  }

  public getChatId(): string {
    return this.chatId
  }
}
