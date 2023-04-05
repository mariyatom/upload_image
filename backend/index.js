var express = require('express');
var multer = require('multer');
var cors= require('cors');
var app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('asset'));


const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
          cb(null,"images/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
    
})

const  upload =  multer({storage:storage});
app.use(cors());
app.post("/imageup",upload.single("file"),(req,res)=>{
    var url = req.file.path; // we can store this  url  variable in the varchar field of the Db table
   // var urldestination = req.file.destination+"/"+req.file.path;
    console.log(url);
res.send({'statusText':"image Uploaded"})
});
app.listen(9000,()=>
{console.log("server running http://localhost:9000/")});