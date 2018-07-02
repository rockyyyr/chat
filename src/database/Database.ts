const config = require('./knexfile.js')
import Knex from 'knex'

export default class Database {

  public instance: Knex

  public static readonly tables: any = {
    messages: 'messages',
    users: 'users',
    chats: 'chats'
  }

  constructor() {
    this.instance = Knex(config[process.env.NODE_ENV])
  }
}
