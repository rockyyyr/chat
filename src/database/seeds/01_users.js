exports.seed = async function(knex) {
  await knex('users').del()
  return knex('users').insert([{
      userId: 1000,
      firstName: 'Rocky',
      lastName: 'Robson',
      email: 'rockyrobson0@gmail.com',
      joinedDate: Date.now().toString(),
      imageUrl: 'https://lh4.googleusercontent.com/-_S-gmAylo-o/AAAAAAAAAAI/AAAAAAAAAKA/fPgkXA-28_g/photo.jpg?sz=50'
    },
    {
      userId: 1001,
      firstName: 'Brittany',
      lastName: 'Ng',
      email: 'brittany-ng@live.com',
      joinedDate: Date.now().toString(),
      imageUrl: 'https://lh4.googleusercontent.com/-_S-gmAylo-o/AAAAAAAAAAI/AAAAAAAAAKA/fPgkXA-28_g/photo.jpg?sz=50'
    },
    {
      userId: 1002,
      firstName: 'Craig',
      lastName: 'Cervo',
      email: 'craig@live.com',
      joinedDate: Date.now().toString(),
      imageUrl: 'https://lh4.googleusercontent.com/-_S-gmAylo-o/AAAAAAAAAAI/AAAAAAAAAKA/fPgkXA-28_g/photo.jpg?sz=50'
    },
    {
      userId: 1003,
      firstName: 'Hello',
      lastName: 'the Cat',
      email: 'hello@meow.com',
      joinedDate: Date.now().toString(),
      imageUrl: 'https://lh4.googleusercontent.com/-_S-gmAylo-o/AAAAAAAAAAI/AAAAAAAAAKA/fPgkXA-28_g/photo.jpg?sz=50'
    }
  ])
}
