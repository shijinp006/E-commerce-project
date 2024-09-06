let express=require("express")

let {loginpage,homepage,resetpassword,Otpverification,confirmpassword,about,product,cart,blog,checkout,contact,element,confirmation,singleblog,singleproduct,main}=require("../../controller/User/homectlr")



let router=express.Router();

router.get("/",homepage)

router.get("/login",loginpage);

router.get("/resetpassword",resetpassword);

router.get("/otpverify",Otpverification);

router.get("/confirmpassword",confirmpassword);

router.get("/home",homepage);

router.get("/productlist",product);

router.get("/cart",cart);

router.get("/about",about);

router.get("/blog",blog);

router.get("/checkout",checkout);

router.get("/contact",contact);

router.get("/element",element);

router.get("/confirmation",confirmation);

router.get("/singleblog",singleblog);

router.get("/singleproduct",singleproduct);

router.get("/main",main)





module.exports=router