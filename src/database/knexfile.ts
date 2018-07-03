export default {

  client: 'mysql2',
  connection: process.env.CLEARDB_DATABASE_URL,
  pool: {
    min: 1,
    max: 10
  }
}
