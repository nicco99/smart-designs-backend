const productsService = require("./products.service");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("product_sku", "product_title");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const VALID_PROPERTIES = [
  "product_sku",
  "product_title",
  "product_description",
  "product_price",
  "product_quantity_in_stock",
  "product_weight_in_lbs",
  "supplier_id",
];

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

async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

async function listTotalWeightByProduct(req, res) {
  res.json({ data: await productsService.listTotalWeightByProduct() });
}


function read(req, res, next) {
  const { product } = res.locals;
  res.json({ data: product });
}

async function create(req, res) {
  const product = await productsService.create(req.body);
  res.status(201).json({ product });
}

async function destroy(req,res){
  
  await productsService.destroy(res.locals.product.product_id)
  res.sendStatus(204)

}

async function listOutOfStockCount(req, res, next) {
  res.json({ data: await productsService.listOutOfStockCount() });
}
async function listPriceSummary(req, res, next) {
  res.json({ data: await productsService.listPriceSummary() });
}

async function update(req, res) {
  const updatedProduct = {
    ...req.body,
    product_id: res.locals.product.product_id,
  };
  const product = await productsService.update(updatedProduct);
  res.json({ data: product });
}

async function list(req, res) {
  const data = await productsService.list();
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: [asyncErrorBoundary(list)],
  destroy: [asyncErrorBoundary(productExists), asyncErrorBoundary(destroy)],
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(productExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update),
  ],
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
  listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),
};
