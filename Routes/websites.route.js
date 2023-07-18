const router = require("express").Router();
// const { route } = require(".");
const checkAuth=require("../services/authServices/checkAuth");
// Controllers
const website=require("../controller/websites.controller");
const auth =require("../controller/customAuth.controller")
// website pannel
router.route("/getProposals").get(checkAuth,website.getProposals);





module.exports = router;