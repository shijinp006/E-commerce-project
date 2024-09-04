const { text } = require("body-parser");
const nodemailer=require("nodemailer")

const sendEmail= async ({email,subject,message}) => {
    try {
        
        console.log(email,subject,message);

        const transporter= nodemailer.createTransport({
            service:`Gmail`,//or other email services;

            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASSWORD
            }
        })

        const mailoption={
            from:process.env.EMAIL_USER,
            to:email,
            subject:subject,
            text:message
        }

        await transporter.sendMail(mailoption)
        
    } catch (error) {
        console.error(error.message)
    }
}


module.exports=sendEmail