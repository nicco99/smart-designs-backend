/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const categories = require("../fixtures/categories")
exports.seed = async function(knex) {
  // Deletes ALL existing entries
 return knex.raw("TRUNCATE TABLE categories RESTART IDENTITY CASCADE")
 .then(function(){
return knex("categories").insert(categories)
 })
};
