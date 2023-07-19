const router = require("express").Router();
// const { route } = require(".");
const checkAuth=require("../services/authServices/checkAuth");
// Controllers
const roomController=require("../Controller/room.controller")
// website pannel

router.route("/addHotel").post(checkAuth,roomController);
router.route("/getHotels").get(checkAuth,roomController);
router.route("/updateHotel").post(checkAuth,roomController);
router.route("/getHotelById").get(checkAuth,roomController);
router.route("/countByType").get(checkAuth,roomController);
router.route("/deleteHotel").post(checkAuth,roomController);



module.exports = router;