const categoriesService = require("./categories.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const VALID_PROPERTIES = ["category_name", "category_description"];

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

async function list(req, res, next) {
  const data = await categoriesService.list();
  res.json({ data });
}

const hasRequiredProperties = hasProperties(
  "category_name",
  "category_description"
);

async function create(req, res, next) {
  const category = await categoriesService.create(req.body);
  res.status(201).json({ data: [category] });
}
async function categoryExists(req, res, next) {
  const category = await categoriesService.read(req.params.categoryId);
  if (category) {
    res.locals.category = category;
    return next();
  }
  next({ status: 404, message: `category cannot be found.` });
}

async function read(req, res, next) {
  const { category } = res.locals;
  res.json({ data: category });
}
async function destroy(req, res,next) {
  const { category } = res.locals;
 await categoriesService.delete(category.category_id);
  res.sendStatus(204);
}

async function update(req, res) {
  const { category } = res.locals;
  const updatedcategory = {
    ...req.body,
    category_id: category.category_id,
  };
  const UpToDatecategory = await categoriesService.update(updatedcategory);
  res.json({ data: UpToDatecategory });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(categoryExists), read],
  update: [
    asyncErrorBoundary(categoryExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update),
  ],
  destroy: [asyncErrorBoundary(categoryExists), asyncErrorBoundary(destroy)],
};
