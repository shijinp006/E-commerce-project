let mongoose=require("mongoose")
let mongourl=process.env.MONGO_URL
let dbconnect=()=>{
    try{
        //mongodb connected
        mongoose.connect(mongourl).then(()=>{
            console.log("mongo conncted success fully");
        })

    }catch(err){
        console.log("database error");
        
    }

}

module.exports=dbconnect
