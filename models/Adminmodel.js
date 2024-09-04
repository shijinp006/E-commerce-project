const mongoose = require('mongoose');

const bcrypt=require("bcrypt")// Erase if already required

// Declare the Schema of the Mongo model
let  AdminSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true,
       
      
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    
    password:{
        type:String,
        required:true,
        unique:true
        
    },

    items: [
        {
            productId: String,
            quantity: { type: Number, default: 1 }
        }
    ]
    // mobile:{
    //     type:String,
    //     required:true,
        
    // },
});



//Export the model
module.exports = mongoose.model('Admin', AdminSchema);