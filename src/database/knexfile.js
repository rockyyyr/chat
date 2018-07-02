module.exports = {

  development: {
    client: 'mysql2',
    connection: require('../../config/database.json'),
    pool: {
      min: 1,
      max: 10
    }
  },

  production: {
    client: 'mysql2',
    connection: process.env.CLEARDB_DATABASE_URL,
    pool: {
      min: 1,
      max: 10
    }
  }
}
