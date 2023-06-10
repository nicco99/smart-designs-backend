require("dotenv").config();

const path = require("path");

const { DATABASE_URL } = process.env;
module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL || "postgres://wndvjubk:S3nNl3n1AjguBbRt0tzp4G8L2hl2crFo@kashin.db.elephantsql.com/wndvjubk",
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
};
