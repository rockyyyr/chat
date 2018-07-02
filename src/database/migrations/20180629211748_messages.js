exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', table => {
    table.increments('id')
    table.integer('chatId').unsigned().references('chatId').inTable('chats').onDelete('cascade').notNullable()
    table.integer('userId').unsigned().references('userId').inTable('users').onDelete('cascade').notNullable()
    table.string('content').notNullable()
    table.string('timestamp').notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages')
}
