module.exports = {

  development: {
    client: 'mysql2',
    connection: process.env.CLEARDB_DATABASE_URL,
    pool: {
      min: 1,
      max: 10
    },
    seeds: {
      directory: './src/database/seeds'
    }
  },

  production: {
    client: 'mysql2',
    connection: process.env.CLEARDB_DATABASE_URL,
    pool: {
      min: 1,
      max: 10
    },
    seeds: {
      directory: './src/database/seeds'
    }
  }
}
