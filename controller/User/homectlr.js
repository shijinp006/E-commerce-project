
let homepage =(req,res) => {
    res.render("User/index")
};

let about = (req,res) =>{
  res.render("User/about")
};

let cart = (req,res) =>{
  res.render("User/cart")
};

let product = (req,res) =>{
  res.render("User/product_list")
};

let blog = (re,res)=>{
  res.render("User/blog")
};

let checkout = (req,res) =>{
  res.render("User/checkout")
};

let contact = (req,res) =>{

  res.render("User/contact")
};

let confirmation = (req,res) =>{
  res.render("User/confirmation")
}

let element = (req,res)=>{

  res.render("User/elements")
}

let loginpage = (req,res) => {
    res.render("User/login")
  };

  let resetpassword = (req,res) => {
    res.render("User/resetpassword")
  };

    let Otpverification = (req,res) => {
     
      res.render("User/OTPverify");
    };

    let confirmpassword = (req,res) => {
      
      res.render("User/confirmpassword")
    };

    let singleblog = (req,res) =>{
      res.render("User/single-blog")
    };

    let singleproduct = (req,res) =>{
      res.render("User/single-product")
    };

    let main = (req,res) =>{
      res.render("User/main")
    }

    
  module.exports={loginpage,homepage,resetpassword,Otpverification,confirmpassword,about,product,cart,blog,checkout,contact,element,confirmation,singleblog,singleproduct,main}