const notfound=(req,res,next)=>{
    
    const error= new Error(`notfound : ${req.originalUrl}`)
    res.status(404);
    next(error)
   
    
};

const errorHandler=(err,req,res,next)=>{
    const statuscode= res.statusCode== 500 ? 200 : res.statusCode;
    res.status(statuscode)
    res.json({
        message:err?.message,
        stack :err?.stack
    })

}


module.exports={errorHandler,notfound}