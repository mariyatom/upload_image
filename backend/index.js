var express=require('express')
var multer=require('multer')
var cors=require('cors')
var app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.static('images'))
var mysql=require('mysql2')
var db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    port:3306,
    database:"testdb"
})
db.connect((err)=>{
 if (err) throw err;
 console.log("connected..")
})


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
         cb(null,"images/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({storage:storage})
app.use(cors())
app.post("/imageup",upload.single("file"),(req,res)=>{
    console.log("Hai Hello")
    var url=req.file.filename;
    var sql="insert into profile values(?,?)"
    db.query(sql,[0,url],(err,result)=>{
    if (err) throw err;
    res.send({'statusText':"image Uploaded"})
    });
})
app.get("/viewimage",(req,res)=>{
    console.log("view image")
    var sql="select * from profile";
    db.query(sql,(err,result)=>{
        res.send(result)
    })


  
})
app.listen(9000,()=>{console.log("Server running http://localhost:9000/")})
