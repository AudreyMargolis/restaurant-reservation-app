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
async function validateTable(req, res, next) {
    const {data : {table_name, capacity} = {}} = req.body;
    if (!table_name || table_name === ""){
        return next({
            status: 400,
            message: "table_name is missing!"
        })
    }
    if(!capacity || capacity < 1){
        return next({
            status: 400,
            message: "Must include a capacity of atleast 1",
          });
    }
    if (table_name.length < 2) {
        return next({
          status: 400,
          message: "Must include a table_name longer than one character.",
        });
      }

    next();
}
async function create(req, res) {
    console.log("create called");
    const data = await service.create(req.body.data);
    res.status(204).json({ data })
}
async function list(req, res) {
    const data = await service.list();
    console.log("DATA IN CONTROLLER", data);
    res.json({ data });
}
async function destroy(req, res) {
    const {data: { table_id } ={}} = req.body;
    const data = await service.destroy(table_id);
    res.status(200).json({ data })
}
async function removeReservation(req, res) {
    const table = await {...res.locals.table,
        reservation_id: null}

    await reservationsService.update(
            Number(res.locals.table.reservation_id),
            "finished"
          );
    const data = await service.update(table);
    res.status(200).json({ data });
}
async function isTableOccupied(req, res, next) {
    if(res.locals.table.reservation_id){
        return next({
            status: 400,
            message: `Table is already occupied by reservation ${res.locals.table.reservation_id}`,
          });
    }
    next();
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
    create: [validateTable, asyncErrorBoundary(create)],
    update: [asyncErrorBoundary(tableExists), isTableOccupied, asyncErrorBoundary(update)],
    destroy,
    removeReservation: [asyncErrorBoundary(tableExists), asyncErrorBoundary(removeReservation)]
}