
const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")
function list() {
    return knex("products").select("*")
}

function create(product){
  return knex("products").insert(product).returning("*").then((createdRecords) => createdRecords[0]);
}



function listOutOfStockCount() {
  return knex("products")
    .select("product_quantity_in_stock as out_of_stock")
    .count("product_id")
    .where({ product_quantity_in_stock: 0 })
    .groupBy("out_of_stock");
}

function update(updatedProduct){
  return knex("products").where({product_id: updatedProduct.product_id}).update(updatedProduct,"*")
}

function listTotalWeightByProduct() {
  return knex("products")
    .select(
      "product_sku",
      "product_title",
      knex.raw(
        "sum(product_weight_in_lbs * product_quantity_in_stock) as total_weight_in_lbs"
      )
    )
    .groupBy("product_title", "product_sku");
}

function destroy(productId) {
  return knex("products").where({product_id: productId}).del()
}

const addCategory = mapProperties({
      category_id: "category.category_id",
      category_name: "category.category_name",
      category_description: "category.category_description",
    });
function read(productId) {
    return knex("products as p")
    .join("products_categories as pc", "p.product_id", "pc.product_id")
    .join("categories as c", "pc.category_id", "c.category_id")
    .select("p.*", "c.*")
    .where({ "p.product_id": productId })
    .first()
    .then(addCategory)

  }

  function listPriceSummary() {
    return knex("products")
      .select("supplier_id")
      .min("product_price")
      .max("product_price")
      .avg("product_price")
      .groupBy("supplier_id");
  }

module.exports = {
    list,
    read,
    update,
    create,
    destroy,
    listOutOfStockCount,
    listPriceSummary,
    listTotalWeightByProduct
}