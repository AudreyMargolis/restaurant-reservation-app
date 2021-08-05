const router = require("express").Router();
const controller = require("./tables.controller");


router.route("/")
.get(controller.list)
.post(controller.create)
.delete(controller.destroy)

router.route("/:table_id/seat")
.delete(controller.removeReservation);




module.exports = router;