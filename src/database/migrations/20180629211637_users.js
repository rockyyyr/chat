exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('userId')
    table.string('email').unique()
    table.string('firstName')
    table.string('lastName')
    table.string('accessToken')
    table.string('imageUrl')
    table.string('joinedDate')

  }).then(() => knex.raw('ALTER TABLE users AUTO_INCREMENT=1000;'))
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
