
const { json } = require("body-parser");
const User = require("../../models/usermodel")
const jwt = require("jsonwebtoken")
const asyncHandler=require("express-async-handler")
const sendEmail = require("../../utilities/sendemail")
const bcrypt = require("bcrypt");


// Assuming this is part of your user registration function
let createUser = asyncHandler(async (req, res) => {
    try {
        const { Username,email, password } = req.body;

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        finduser =  User.findOne({Username:Username,email:email,password:password})

        if(finduser){

            res.json("Username already existed")

        }else{

             // Save the user with the hashed password
            const newUser = new User({
                email: email,
                password: hashedPassword,
                Username:Username
            });
    
            await newUser.save();
            
            res.redirect("/home")
           
        }
       
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});



let login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const finduser = await User.findOne({ email: email });

        if (finduser) {
            // Compare the provided password with the hashed password stored in the database
            const isMatch = await bcrypt.compare(password, finduser.password);

            if (isMatch) {
                // If passwords match, proceed with login
                req.session.email = finduser.email;
                console.log("Logged in successfully");

                res.redirect("/home")
                
            } else {
                // If passwords don't match
                res.status(401).json("Invalid password or username");
            }
        } else {
            // If the user is not found
            res.status(401).json("Invalid password or username");
           
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});


            


const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email format
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Find user by email
        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a reset token
        const resetToken = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, { expiresIn: '30m' });

        // Construct reset URL (make sure to remove any extra space in the URL)
        const resetUrl = `http://yourfrontend.com/passwordreset/${resetToken}`;

        // Generate OTP
        const otp = Math.floor(Math.random() * 1000000);

        // Store OTP & Email in session and in-memory store

        req.session.otp = otp;
        req.session.email=email;

        // Send password reset email
        await sendEmail({
            email: findUser.email,
            subject: 'Password Reset Request',
            message: `You requested a password reset. Please use the following OTP to reset your password: ${otp}\n\nIf you didn't request this, please ignore this email.`
        });
             res.status(200).redirect("/otpverify")

        
    } catch (error) {
        console.error("Error in forgotpassword:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const verifyotp = asyncHandler(async (req, res) => {
    try {
        const { otp } = req.body;

        // Ensure OTP is provided
        if (!otp) {
            return res.status(400).json({ message: "OTP is required." });
        }

        // Retrieve stored OTP from session
        const storedOtp = req.session.otp;
        console.log(`Received OTP: ${otp}`);
        console.log(`Stored OTP: ${storedOtp}`);

        // Check if the OTP exists in the session
        if (!storedOtp) {
            return res.status(400).json({ message: "OTP has expired or does not exist." });
        }

        // Validate the provided OTP
        if (storedOtp == otp) {
            // Clear the OTP from session after successful verification
            req.session.otp = null; // Clear OTP
            return res.json({ message: "OTP verified successfully." });
        } else {
            return res.status(400).json({ message: "Invalid OTP." });
        }
    } catch (error) {
        console.error("Error during OTP verification:", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
});


let confirmpassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;
        console.log(password,confirmPassword);
        
        const email = req.session.email;

        if (!email) {
            return res.status(400).json({ message: "No email found in session." });
        }

        if (!password || !confirmpassword) {
            return res.status(400).json({ message: "Password fields cannot be empty." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(200).json({ message: "Password updated successfully!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "An error occurred while updating the password." });
    }
};


let cart= async (req,res)=>{

    let {productid} = req.body

    

}

module.exports = { createUser, login, forgotpassword,verifyotp,confirmpassword,cart }
