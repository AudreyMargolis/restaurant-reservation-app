const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

/**
 * List handler for reservation resources
 */
async function create(req, res) {
  const data = await service.create(req.body);
  res.status(204).json({ data })
}
async function list(req, res) {
  const data = await service.list(req.query);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create),
};
