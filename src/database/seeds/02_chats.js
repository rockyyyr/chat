exports.seed = async function(knex) {
  await knex('chats').del()
  return knex('chats').insert([
    { chatId: 1000, userId: 1000, recipient: 1001 },
    { chatId: 1001, userId: 1000, recipient: 1002 },
    { chatId: 1002, userId: 1000, recipient: 1003 }
  ])
}
