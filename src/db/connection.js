const env = process.env.NODE_ENV || "development";
const pEnv = "production"
const config = require("../../knexfile")[pEnv];
const knex = require("knex")(config);

module.exports = knex;