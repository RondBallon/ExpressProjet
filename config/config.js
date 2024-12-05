module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "blog",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: console.log, // Optionnel : pour afficher les requêtes SQL
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "blog",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: "postgres",
    database: "blog",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};