require("dotenv").config();

const path = require("path");

const { DATABASE_URL } = process.env;
module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL || "postgres://zwfftpfr:OG4JNkjl122KbhxzrJNOu7MfLztIQ7xm@mahmud.db.elephantsql.com/zwfftpfr",
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
};
