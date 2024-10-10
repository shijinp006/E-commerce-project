const { log } = require("console");

let express=require("express");

let app= express();

const bodyParser = require("body-parser");

// let fetch = require("node-fetch")

let dotenv=require("dotenv").config();

let path= require("path");

let session=require("express-session");

let port=process.env.PORT

let dbconnect=require("./config/dbconnect");

let authRouter=require("./routes/User/Authroute");

let AdminauthRouter=require("./routes/Admin/AdminAuthroute");

let home= require("./routes/User/routehome");

let Adminhome= require("./routes/Admin/Adminroutehome");

let Adminroute = require ("./routes/Admin/Adminrout");

const {notfound, errorHandler} = require("./middleware/errorhandler");

dbconnect();

app.set ("view engine","ejs");

app.set("views","views");

app.use(session({
    secret:"secret_key",
    resave:false,
    saveUninitialized:false
}));

app.use (express.static("public"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/user",authRouter);

app.use("/api/Admin",AdminauthRouter);

app.use("/api/Admin",Adminroute);

app.use(home);

app.use(Adminhome);

app.use(notfound);

app.use(errorHandler);



app.listen(port,()=>{
    console.log(`server running start http://localhost:${port}`);
    
});


