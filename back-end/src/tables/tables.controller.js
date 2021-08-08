const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service")

async function  tableExists(req, res, next) {
    const tableId = req.params.table_id;
    const table = await service.read(tableId);

    if (table) {
        res.locals.table = table;
        next();
      } else {
        next({
          status: 404,
          message: `Table: ${tableId} is missing.`,
        });
    }
}
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
    const {data: { table_id } ={}} = req.body;
    const data = await service.destroy(table_id);
    res.status(200).json({ data })
}
async function removeReservation(req, res) {
    const data = await service.removeReservation(req.body.data);
    res.status(200).json({ data });
}
async function update(req, res) {
    const updatedTable = await {
        ...res.locals.table,
        reservation_id: req.body.data.reservation_id
    };
    await reservationsService.update(
        Number(req.body.data.reservation_id),
        "seated"
      );
    
    const updatedData = await service.update(updatedTable);
    res.status(200).json({ data: updatedData });
}

module.exports = {
    list,
    create,
    update: [asyncErrorBoundary(tableExists), asyncErrorBoundary(update)],
    destroy,
    removeReservation
}