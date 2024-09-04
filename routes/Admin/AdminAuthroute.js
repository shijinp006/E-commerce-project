let express= require("express");

let {createAdmin,Adminlogin,forgotpassword,verifyotp,confirmpassword}=require("../../controller/Admin/adminctrl");

let router = express.Router();

router.post("/signup",createAdmin);

router.post("/login",Adminlogin);

router.post("/forgotpassword",forgotpassword);

router.post("/verifyotp",verifyotp);

router.post("/confirmpassword",confirmpassword)




module.exports=router