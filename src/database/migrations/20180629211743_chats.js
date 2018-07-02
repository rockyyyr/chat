exports.up = function(knex, Promise) {
  return knex.schema.createTable('chats', table => {
    table.increments('chatId')
    table.integer('userId').unsigned().references('userId').inTable('users').onDelete('cascade').notNullable()
    table.integer('recipient').unsigned().references('userId').inTable('users').onDelete('cascade').notNullable()
  }).then(() => knex.raw('ALTER TABLE chats AUTO_INCREMENT=1000;'))
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chats')
}
