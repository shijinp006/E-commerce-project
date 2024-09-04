let express=require("express")

const { createUser,login,forgotpassword,verifyotp,confirmpassword,cart } = require("../../controller/User/userctrl");


let router=express.Router();

router.post("/signup",createUser);

router.post("/login",login);

router.post("/forgotpassword",forgotpassword);

router.post("/verifyotp",verifyotp)

router.post("/confirmpassword",confirmpassword)

router.post("/cart",cart)



module.exports=router