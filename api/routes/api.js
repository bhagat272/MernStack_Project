const express = require('express')
const router = express.Router()
const userc = require('../controller/user')
const adminC = require("../controller/admin")
 

router.get("/home",userc.homePageController)
router.post("/register",userc.regController)
router.post("/checkuser",userc.usercheckController)
router.post('/productsformdata',adminC.productinsertController);

router.get("/getproductdata",adminC.productdataController)
router.get("/updateformdata/:Productid",adminC.updateformController)
router.put("/updateproductdata/:id",adminC.updateproductController)
router.delete("/productdelete/:id",adminC.deleteproductController)
router.delete("/querydelete/:id",userc.deletequeryController)
router.get("/productinstock",adminC.productInstockController)
router.post("/querysform",userc.queryformController)
router.get("/querysdata",userc.QueryformdataController)
router.get("/queryemail/:id",userc.queryfindController)
router.post("/queryreply",adminC.queryreplyController)
router.get("/userlist",adminC.UserlistController)
router.get("/userstatus/:id",adminC.userstatusController)
module.exports = router