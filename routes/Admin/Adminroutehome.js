const express = require("express");

const {loginpage,homepage,resetpassword,Otpverification,confirmpassword} = require("../../controller/Admin/Adminhomectrl");

const {Admincategory,Admineditcategory} = require("../../controller/Admin/categoryctrl");

const  {Adminproduct,editproductpage} = require("../../controller/Admin/productctrl");

const {Userdetails} = require ("../../controller/Admin/Userdetailsctrl");

const router = express.Router();

router.get("/Adminhome",homepage)

router.get("/Adminlogin",loginpage)

router.get("/Adminresetpassword",resetpassword);

router.get("/Adminotpverify",Otpverification);

router.get("/Adminconfirmpassword",confirmpassword);

router.get("/Admincategory",Admincategory);

router.get("/category/edit/:id",Admineditcategory);

router.get("/Adminproduct",Adminproduct);

router.get("/product/edit/:id",editproductpage);

router.get("/userdetails", Userdetails)



  


module.exports = router