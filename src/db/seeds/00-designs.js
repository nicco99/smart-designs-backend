const data = require("../fixtures/designs");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("designs").truncate();

  // Inserts seed entries
  await knex("designs").insert(data);
};
