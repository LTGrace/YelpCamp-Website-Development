var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.post("/",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username:req.user.username
    }
    var newCampground = {name:name,image:image,description:desc,author:author};
    //campgrounds.push(newCampground);
    Campground.create(newCampground,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })
    
});
router.get("/",function(req,res){
    console.log(req.user);
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
        }
    });
    
});

router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new"); 
});

router.get("/:id",function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});

// Edit ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res){
            Campground.findById(req.params.id,function(err,foundCampground){
                res.render("campgrounds/edit",{campground:foundCampground});
        });
    
});

//Update Route

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updateCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            req.flash("success","Campground Updated successfully!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
//Delete Route

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success","Campground deleted successfully!");
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;
