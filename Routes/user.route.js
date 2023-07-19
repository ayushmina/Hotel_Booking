const router = require("express").Router();
// const { route } = require(".");
const checkAuth=require("../services/checkAuth");
// Controllers
const userController=require("../Controller/user.controller")
// website pannel

router.route("/login").post(userController.signinUser);
router.route("/signup").post(userController.signup);
router.route("/updateUser").post(userController.updateUser);
router.route("/getHotelById").get(userController.getUser);
router.route("/deleteUser").post(userController.deleteUser);



module.exports = router;