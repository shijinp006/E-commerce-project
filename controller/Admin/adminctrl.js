const { json } = require("body-parser");
const Admin = require("../../models/Adminmodel")
const jwt = require("jsonwebtoken")
const asyncHandler=require("express-async-handler")
const sendEmail = require("../../utilities/sendemail")
const bcrypt = require("bcrypt");

let createAdmin = asyncHandler(async (req, res) => {
    try {
        const { Username, email, password } = req.body;

        // Validate input
        if (!Username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check if an admin with the same username or email already exists
        const existingAdmin = await Admin.findOne({
            $or: [{ Username }, { email }]
        });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }

        // Save the Admin with the hashed password
        const newAdmin = new Admin({
            Username,
            password: hashedPassword, // Save the hashed password
            email
        });

        await newAdmin.save();

        res.status(201).json({ message: 'Account created successfully' });

    } catch (error) {
        console.error('Error creating admin:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});
let Adminlogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Find the admin by email
        let findAdmin = await Admin.findOne({ email:email });

        if (findAdmin) {
            // Compare the provided password with the hashed password
            const isMatch = await bcrypt.compare(password, findAdmin.password);

            if (isMatch) {
                // If passwords match, proceed with login
                req.session.email = findAdmin.email;
                console.log("Logged in successfully");

                res.status(200).redirect("/Adminhome")

                // res.redirect("/Adminhome");
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
};

    const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email format
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Find user by email
        const findAdmin = await Admin.findOne({ email });

        if (!findAdmin) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a reset token
        const resetToken = jwt.sign({ id: findAdmin._id }, process.env.JWT_SECRET, { expiresIn: '30m' });

        // Construct reset URL (make sure to remove any extra space in the URL)
        const resetUrl = `http://yourfrontend.com/passwordreset/${resetToken}`;

        // Generate OTP
        const otp = Math.floor(Math.random() * 1000000);

        // Store OTP in session and in-memory store
        req.session.otp = otp;

        req.session.email= email;

        // Send password reset email
        await sendEmail({
            email: findAdmin.email,
            subject: 'Password Reset Request',
            message: `You requested a password reset. Please use the following OTP to reset your password: ${otp}\n\nIf you didn't request this, please ignore this email.`
        });
             res.status(200).redirect("/Adminotpverify")


        
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
        
        const email = req.session.email;

        if (!email) {
            return res.status(400).json({ message: "No email found in session." });
        }

        if (!password || !confirmPassword) {
            return res.status(400).json({ message: "Password fields cannot be empty." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        // Await the result of findOne to get the admin document
        const admin = await Admin.findOne({ email: email });

        if (!admin) {
            return res.status(404).json({ message: "User not found." });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);

        await admin.save();

        res.status(200).json({ message: "Password updated successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while updating the password." });
    }
};





module.exports={createAdmin,Adminlogin,forgotpassword,verifyotp,confirmpassword}