const knex = require("../db/connection");
function list() {
  return knex("categories").select("*");
}
function read(categoryId) {
  return knex("categories")
    .select("*")
    .where({ category_id: categoryId })
    .first();
}
function create(category) {
  return knex("categories")
    .insert(category)
    .returning(["category_name","category_description"])
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedCategories) {
  return knex("categories")
    .where({ category_id: updatedCategories.category_id })
    .update(updatedCategories, ["category_name", "category_description"]);
}

function destroy(categoryId) {
  return knex("categories").where({ category_id: categoryId }).del();
}

module.exports = {
  list,
  read,
  create,
  update,
  delete: destroy,
};
