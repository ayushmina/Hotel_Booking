const router = require("express").Router();
// const { route } = require(".");
const checkAuth=require("../services/authServices/checkAuth");
// Controllers
const hotelController=require("../Controller/hotel.controller")
// website pannel
router.route("/addHotel").post(checkAuth,hotelController.addHotel);
router.route("/getHotels").get(checkAuth,hotelController.getHotels);
router.route("/updateHotel").post(checkAuth,hotelController.updateHotel);
router.route("/getHotelById").get(checkAuth,hotelController.getHotelById);
router.route("/countByType").get(checkAuth,hotelController.countByType);
router.route("/deleteHotel").post(checkAuth,hotelController.deleteHotel);


module.exports = router;