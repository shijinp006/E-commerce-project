let express = require("express");

let {loginpage,homepage,resetpassword,Otpverification,confirmpassword} = require("../../controller/Admin/Adminhomectrl")

let router = express.Router();

router.get("/Adminhome",homepage)

router.get("/Adminlogin",loginpage)

router.get("/Adminresetpassword",resetpassword)

router.get("/Adminotpverify",Otpverification)

router.get("/Adminconfirmpassword",confirmpassword)


module.exports = router