const mongoose = require('mongoose');

const bcrypt=require("bcrypt");// Erase if already required
const { truncate } = require('fs');

// Declare the Schema of the Mongo model
let  userSchema = new mongoose.Schema({
    username:{
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
    ],
    mobile:{

        type:String,
        required:true,
        
    },

    is_blocked : {

        type:Boolean,
        required:true
    }
});



//Export the model
module.exports = mongoose.model('User', userSchema);