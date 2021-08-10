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
    res.status(201).json({ data })
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
async function checkForReservation(req, res, next) {
 
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
async function resExists(req, res, next) {
    console.log("")
    const resId = req.body.data.reservation_id;
    if(!resId){
        next({ status:400,
            message: "reservation_id is missing"})
    }
    const reservation = await reservationsService.read(resId);
    if(reservation){
        res.locals.seatingreservation = reservation;
        next();
    }
    else{
        next({ status:404,
        message: `reservation_id ${resId} doesn't exist`})
    }
}
async function capacityCheck(req, res, next){
    if(res.locals.table.capacity < res.locals.seatingreservation.people){
        next({
            status: 400,
            message: "Table does not have sufficient capacity"
        })
    }
    else
        next();
}
async function validateDataSent(req, res, next) {
    const data = req.body.data;
  
    if (!data || !data.reservation_id) {
      return next({
        status: 400,
        message: `Data and reservation_id do not exist.`,
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
    list: [asyncErrorBoundary(list)],
    create: [validateTable, asyncErrorBoundary(create)],
    update: [asyncErrorBoundary(tableExists), validateDataSent, asyncErrorBoundary(resExists), capacityCheck, isTableOccupied, asyncErrorBoundary(update)],
    destroy,
    removeReservation: [asyncErrorBoundary(tableExists), asyncErrorBoundary(removeReservation)]
}