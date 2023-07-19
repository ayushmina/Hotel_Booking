const router = require("express").Router();
// const { route } = require(".");
const checkAuth=require("../services/checkAuth");
// Controllers
const roomController=require("../Controller/room.controller")
// website pannel

router.route("/createRoom").post(checkAuth,roomController.createRoom);
router.route("/deleteRoom").post(checkAuth,roomController.deleteRoom);
router.route("/getHotels").get(roomController.getHotels);
router.route("/getRoomById").get(roomController.getRoomById);
router.route("/updateRoom").post(checkAuth,roomController.updateRoom);
router.route("/updateRoomAvailability").post(checkAuth,roomController.updateRoomAvailability);



module.exports = router;