const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

/**
 * List handler for reservation resources
 */
function validateReservation (req, res, next) {
  const {data: {first_name, last_name, mobile_number, reservation_date, reservation_time} ={}} = req.body;
    let temp_reservation_time = reservation_time.replace(":","");
      console.log("Reservation Time", temp_reservation_time);
      if(!first_name || first_name === "first name" || first_name === "" || first_name.includes(" ")){
        next({ status: 400, message: "Need a valid First Name!"})
      }
      else if(!last_name || last_name === "last name" || last_name === ""){
        next({ status: 400, message: "Need a valid Last Name!"})
      }
      else if(mobile_number.length !== 12 || mobile_number === "555-555-5555" ){
        next({ status: 400, message: "Need a valid phone number!"})
      }
      else if(Date.parse(reservation_date) < Date.now()){
        next({ status: 400, message: "Reservation needs to be on a future date!"})
      }
      else if(new Date(reservation_date).getDay()+1 === 2){
        next({ status: 400, message: "We are closed on Tuesdays! Pick a day when we are open."});
      }
      else if(temp_reservation_time < 1030){
        next({ status: 400, message: "Reservation cannot be before business hours!"});
      }
      else if(temp_reservation_time > 2130){
        next({ status: 400, message: "Reservation cannot be less than one hour before business closing!"});
      }
      else{
        console.log("VALID RESERVATION");
        next();
      }
}
async function isTimeTaken(req, res, next) {
  const {data: {reservation_date, reservation_time} ={}} = req.body;
  const data = await service.findByDateAndTime(reservation_date, reservation_time);
  if(data.length)
    next({ status: 400, message: "Reservation already scheduled for this time!"});

  next();
}
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(204).json({ data })
}
async function list(req, res) {
  
  //if(req.query.date){
    const reservation_date = req.query.date;
    console.log(reservation_date);
    const data = await service.list(reservation_date);
 // }
  // else if(req.query.id){
  //   const reservation_id = req.query.id;
  //   const data = await service.read(reservation_id);
  // }
  res.json({ data });
}

// async function read(req, res) {
//   const reservation_id = req.query.id;
//   const data = await service.read(reservation_id);
//   res.json({ data });
// }

module.exports = {
  list: asyncErrorBoundary(list),
  create: [validateReservation, isTimeTaken, asyncErrorBoundary(create)],
};
