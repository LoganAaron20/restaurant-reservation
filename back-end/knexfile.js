/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require("dotenv").config();
const path = require("path");

const {
  DATABASE_URL = "postgres://zulpolcw:hX_LXm5QT9MlAgy-b1ycPWzoAj-x0FBJ@heffalump.db.elephantsql.com/zulpolcw",
  DATABASE_URL_DEVELOPMENT = "postgres://tijsmbjv:aYQSXxH3PH0VX2ctGhCbN166-_10DwVa@heffalump.db.elephantsql.com/tijsmbjv",
  DATABASE_URL_TEST = "postgres://hymqfpyh:K-biiw2_jxZjTRqm04d4jPaxX_ymUhgk@heffalump.db.elephantsql.com/hymqfpyh",
  DATABASE_URL_PREVIEW = "postgres://sdckqcvm:9zF0MR1Se0K7XLvRbdd5O4fSuB3noYY5@heffalump.db.elephantsql.com/sdckqcvm",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
