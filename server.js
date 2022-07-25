const express = require("express");
const app = express();


const fileUpload=require("express-fileupload");

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");


app.use(fileUpload());


app.listen(8000, () => {
  console.log("Started Listening on port 8000");
});

var blogs=[];
app.get("/blogs", (req, res) => {
  res.render("blogs", { blogs: blogs });
});
app.get("/add",(req,res)=>{
    res.sendFile(__dirname+"/addblog.html");
});
app.get("/delete",(req,res)=>{
  res.sendFile(__dirname+"/delete.html");
 
});
app.post("/delete",(req,res)=>{
  const title=req.body.bTitle;
  var temp=[];
  var j=0;
  for(var i=0;i<blogs.length;i++)
  {
    if(title!=blogs[i].blogTitle)
    {
      temp[j]=blogs[i];
      j++;
    }
  }
  blogs=temp;
  res.redirect("/blogs");

 
});

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html");
});
app.post("/load",(req,res)=>{
    const date=new Date();
    console.log(req.files.profileImg);
    const profilePic=req.files.profileImg;
    const blogPic=req.files.blogImg;
    profilePic.mv(__dirname+"/public/images/"+profilePic.name,function(){
      console.log("Uploaded file successfully!");
    });
    blogPic.mv(__dirname+"/public/images/"+blogPic.name,function(){
      console.log("Uploaded file successfully!");
    })
    var object={
        blogTitle:req.body.title,
        blogDesc:req.body.desc,
        authorName:req.body.authName,
        date:date
    }
    blogs.push(object);
    res.redirect("/blogs");
})