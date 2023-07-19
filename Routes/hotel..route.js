const router = require("express").Router();
// const { route } = require(".");
const checkAuth=require("../services/checkAuth");
// Controllers
const hotelController=require("../Controller/hotel.controller")
// website pannel
router.route("/addHotel").post(checkAuth,hotelController.addHotel);
router.route("/getHotels").get(hotelController.getHotels);
router.route("/updateHotel").post(checkAuth,hotelController.updateHotel);
router.route("/getHotelById").get(hotelController.getHotelById);
router.route("/countByType").get(hotelController.countByType);
router.route("/deleteHotel").post(hotelController.deleteHotel);


module.exports = router;