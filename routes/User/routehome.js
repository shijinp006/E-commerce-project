let express=require("express")

let {loginpage,homepage,resetpassword,Otpverification,confirmpassword,shop,product,cart}=require("../../controller/User/homectlr")



let router=express.Router()

router.get("/login",loginpage)

router.get("/resetpassword",resetpassword)

router.get("/otpverify",Otpverification)

router.get("/confirmpassword",confirmpassword)

router.get("/home",homepage)

router.get("/shop",shop)

router.get("/product",product)

router.get("/cart",cart)








module.exports=router