const multer=require('multer');
const path=require('path');
const fs=require('fs');
const uploadDir=path.join(__dirname,'../public/uploads');


if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true});

    
}
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/uploads');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
});
const upload=multer({
    storage:storage,
    limits:{fileSize:5000000},
    fileFilter:function(req,file,cb){
        const filetypes= /jpeg|jpg|png|gif/;
        const mimetype=filetypes.test(file.mimetype);
        const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
        if(mimetype&&extname){
            return cb(null,true);
        }else{
            cb('Error,Images only!');
        }
    }
});
module.exports=upload;







