/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const designs = require("../fixtures/designs")
exports.seed = async function(knex) {
  // Deletes ALL existing entries
   return knex.raw("TRUNCATE TABLE designs RESTART IDENTITY CASCADE")
   .then(function (){
    return knex("designs").insert(designs)
   })
};
