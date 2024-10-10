
const { truncateSync } = require("fs");
const Usermodel = require("../../models/usermodel")

const Userdetails = async (req,res) => {
try {
   const users = await Usermodel.find();

   res.render("Admin/Usersdetails", { users});

} catch (error) {

    console.error(error.message);
}
}

const blockuser = async (req,res) => {
    try {
        const userId = req.params.id;

        const user = await Usermodel.findById(userId);

        if(user) {
            if(!user.is_blocked){
                user.is_blocked = true;
                await user.save()
            }
            res.status(200).redirect("/userdetails")
        }
    } catch (error) {

        console.error(error.message)
    }
}

const unblockuser = async (req,res) => {
    try {
        const userId = req.params.id;

        const user = await Usermodel.findById(userId);

        if(user) {
            if(user.is_blocked){
                user.is_blocked = false;
                await user.save()
            }
            res.status(200).redirect("/userdetails")
        }
    } catch (error) {

        console.error(error.message);
    }
}

module.exports = {Userdetails,blockuser,unblockuser}