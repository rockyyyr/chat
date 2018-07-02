import Message from "./Message";

export default class MessageFactory {

  public static buildMessage(data: { chatId, userId, content }) {
    return new Message({ ...data, timestamp: MessageFactory.timestamp() })
  }

  private static timestamp() {
    return Date.now()
  }
}
