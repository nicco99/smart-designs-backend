/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const products = require("../fixtures/products")
exports.seed = async function(knex) {
  // Deletes ALL existing entries
   return knex.raw("TRUNCATE TABLE products RESTART IDENTITY CASCADE")
   .then(function (){
    return knex("products").insert(products)
   })
};
