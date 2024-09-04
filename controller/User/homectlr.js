
let homepage =(req,res) => {
    res.render("User/index")
}

let shop = (req,res) =>{
  res.render("User/shop")
}

let cart = (req,res) =>{
  res.render("User/cart")
}

let product = (req,res) =>{
  res.render("User/product-details")
}

let loginpage = (req,res) => {
    res.render("User/login")
  }

  let resetpassword = (req,res) => {
    res.render("User/resetpassword")
  }

    let Otpverification = (req,res) => {
     
      res.render("User/OTPverify");
    }

    let confirmpassword = (req,res) => {
      
      res.render("User/confirmpassword")
    }

    
  module.exports={loginpage,homepage,resetpassword,Otpverification,confirmpassword,shop,product,cart}