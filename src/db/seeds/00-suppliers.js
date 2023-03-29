/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const suppliers = require("../fixtures/suppliers");
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex
  .raw("TRUNCATE TABLE suppliers RESTART IDENTITY CASCADE")
  .then(function () {
    return knex("suppliers").insert(suppliers);
  });
};
