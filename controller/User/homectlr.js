const Category = require('../../models/category'); // Adjust the path based on your project structure

const Product = require("../../models/product")

let homepage =(req,res) => {
    res.render("User/index")
};

let about = (req,res) =>{
  res.render("User/about")
};

let cart = (req,res) =>{
  res.render("User/cart")
};

let product = async (req,res) =>{
  try {
    const categories = await Category.find(); 
    

    let products;
    if (req.query.category) {
        const selectedCategory = req.query.category;  
        
        
        products = await Product.find({ category: selectedCategory });  
        
        
    } else {
        products = await Product.find();  
    }

   
    res.render('User/product_list', { categories, products });
} catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
}
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

    let singleproduct = async (req,res) =>{
      
      try {
        const productId = req.query.product; 

        const products = await Product.findById(productId); 

        let product=[];

        product.push(products)
      
        

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('User/single-product', { product:product }); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
     
    };

    let main = (req,res) =>{
      res.render("User/main")
    }

    
  module.exports={loginpage,homepage,resetpassword,Otpverification,confirmpassword,about,product,cart,blog,checkout,contact,element,confirmation,singleblog,singleproduct,main}