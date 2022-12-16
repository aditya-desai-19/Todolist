const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-aditya:aditya2k@mycluster.5vcyp72.mongodb.net/myDb");

const itemsSchema = {
    name: String
};

const Item = mongoose.model("item", itemsSchema);

const Reading = new Item({
    name: "Reading Book"
});

const dsa = new Item({
    name: "Data Structures and Algorithm"
});

const dev = new Item({
    name: "Development"
});

//ejs 
app.set("view engine", "ejs");

app.get("/",function(req,res){ 

    Item.find({}, function(err, foundItems){
        if(foundItems.length == 0){
            Item.insertMany([Reading, dsa, dev], function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Inserted successfully");
                }
            });
            res.redirect("/");
        }
        res.render("list",{listTitle: "Today", newItem: foundItems});
    })
    
});

app.post("/",function(req,res){
    const itemName = req.body.nextItem;
    
    const item = new Item({
        name: itemName
    });

    item.save();

    res.redirect("/");
});

app.post("/delete", function(req,res){
    const id = req.body.checkbox;

    Item.findByIdAndRemove(id, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Successfully deleted");
        }
    });

    res.redirect("/");
});

app.get("/about",function(req, res){
    res.render("about");
});

app.listen(5000,function(){
    console.log("Server is running on port 5000");
})