const { functions } = require("lodash");
const knex = require("../db/connection");

function create(suppliers) {
  return knex("suppliers")
    .insert(suppliers)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedSupplier){
    return knex("suppliers").where({supplier_id: updatedSupplier.supplier_id}).update(updatedSupplier, "*")
}

function list() {
    return knex("suppliers").select("*")
}

function read(supplierId){
    return knex("suppliers").select("*").where({supplier_id: supplierId}).first()
}


module.exports = {
    create,
    read,
    list,
    update
}