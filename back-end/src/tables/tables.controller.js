const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");

async function create(req, res) {
    console.log("create called");
    const data = await service.create(req.body.data);
    res.status(204).json({ data })
}
async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}
async function destroy(req, res) {
    const data = await service.create(req.body.data);
    res.status(200).json({ data })
}
async function removeReservation(req, res) {

}

module.exports = {
    list,
    create,
    destroy,
    removeReservation
}