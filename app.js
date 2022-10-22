const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var addedItems=["Add your things","Click on + sign"];
let workItems = [];

app.get("/",function(req,res){
  let day = new Date().toLocaleDateString('en-us', { weekday:"long", day:"numeric", month:"long"});

  res.render("list",{listTitle:day,newlistitems:addedItems});
})

app.post("/",function(req,res){
  var addedItem = req.body.newitem;
console.log(req.body);
console.log(req.body.list);
  if((req.body.list) == "Worklist")
  {
    console.log(req.body.list);
     workItems.push(addedItem);
     res.redirect("/work");
  }
  else{
    addedItems.push(addedItem);
    res.redirect("/");
  }



})

app.get("/work",function(req,res){
  res.render("list",{listTitle:"Worklist",newlistitems:workItems});

})
app.post("/work",function(req,res){
  var workItem = req.body.newitem;
  workItems.push(workItem);
  res.redirect("/work");

})

app.listen(3000,function(req,res){
  console.log("Server is running on port 3000");
})
