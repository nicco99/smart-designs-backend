const suppliersService = require("./suppliers.service");
const hasProperties = require("../errors/hasProperties");
const knex = require("../db/connection");
const VALID_PROPERTIES = [
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_notes",
  "supplier_type_of_goods",
];
const hasRequiredProperties = hasProperties("supplier_name", "supplier_email");
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

function create(req, res, next) {
  suppliersService
    .create(req.body)
    .then((data) => res.status(201).json({ data }))
    .catch(next);
}

function list(req, res) {
  return knex("suppliers")
    .select("*")
    .then((data) => res.status(200).json({ data }));
}

function supplierExists(req, res, next) {
  suppliersService
    .read(req.params.supplierId)
    .then((supplier) => {
      if (supplier) {
        res.locals.supplier = supplier;
        next();
      }
      next({ status: 404, message: "Supplier not found" });
    })
    .catch(next);
}

function read(req, res) {
  const { supplier: data } = res.locals;
  res.json({ data });
}

async function update(req, res, next) {

const updateSupplier = {
  ...req.body,
  supplier_id: res.locals.supplier.supplier_id
}
  const supplier =  suppliersService.update(updateSupplier)
  res.json({supplier});
}

async function destroy(req, res, next) {
  try {
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create: [hasRequiredProperties, create],
  update,
  list,
  read: [hasOnlyValidProperties, supplierExists, read],
  delete: destroy,
};
