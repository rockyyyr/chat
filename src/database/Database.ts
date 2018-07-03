import config from './knexfile'
import Knex from 'knex'

export default class Database {

  public instance: Knex

  public static readonly tables: any = {
    messages: 'messages',
    users: 'users',
    chats: 'chats'
  }

  constructor() {
    this.instance = Knex(config)
  }
}
