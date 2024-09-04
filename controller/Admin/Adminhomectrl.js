let homepage = (req,res) => { 

    res.render();
};

let loginpage = (req,res) => {
     
    res.render("Admin/Adminlogin");
};

let resetpassword = (req,res) => {
    res.render("Admin/Adminresetpassword");
  }

    let Otpverification = (req,res) => {
     
      res.render("Admin/AdminOTPverify");
    }

    let confirmpassword = (req,res) => {
      
      res.render("Admin/Adminconfirmpassword");
    }

    
  module.exports={loginpage,homepage,resetpassword,Otpverification,confirmpassword}