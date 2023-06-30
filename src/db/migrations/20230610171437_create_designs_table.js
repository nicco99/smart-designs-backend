/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("designs", (table) => {
    table.increments("design_id").primary();
    table.integer("no_of_bathrooms");
    table.integer("no_of_bedrooms");
    table.string("county");
    table.string("location");
    table.string("image1");
    table.string("image2");
    table.string("image3");
    table.string("image4");
    table.string("image5");
    table.string("property_size");
    table.string("property_type");
    table.string("property_name");
    table.integer("price_per_sqm");
    table.integer("total_price");
    table.string("class_of_finishes");
    table.string("feature1");
    table.string("feature2");
    table.string("feature3");
    table.string("feature4");
    table.string("feature5");
    table.string("status");
    table.string("plinth_area");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("designs");
};
