import knex from "knex";


const db = knex({
    client: 'pg',
    connection: {
        host: 'dpg-clcd9tbmot1c73df9280-a.oregon-postgres.render.com',
        port: 5432,
        user: 'finalproject',
        database: 'finalproject_ejoh',
        password: 'qsbaCJpxU6wNBwxgDa8v9rQ8F7yTAKCI',
        ssl: true,
      },
      useNullAsDefault: true,
      pool: { min: 0, max: 7 }
});

export default db;