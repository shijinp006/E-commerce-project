const express = require("express");

const router = express.Router();

const upload = require("../../middleware/multer");

const {createCategory,editcategory,deletecategory} = require("../../controller/Admin/categoryctrl");

const {Addproduct,editproduct,deleteproduct} = require ("../../controller/Admin/productctrl");

const {blockuser,unblockuser} = require("../../controller/Admin/Userdetailsctrl");

router.post("/addcategory", upload.single('image'),createCategory);

router.post ("/category/edit/:id",upload.single("image"),editcategory);

router.post ("/category/delete/:id",deletecategory);

router.post ("/addproduct",upload.single('image'),Addproduct);

router.post ("/product/delete/:id",deleteproduct);

router.post("/product/edit/:id",upload.single('image'),editproduct);

router.post("/blockuser/:id",blockuser);

router.post("/unblockuser/:id",unblockuser)

module.exports = router;
