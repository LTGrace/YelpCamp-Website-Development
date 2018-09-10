//=========Comments Routes========
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req, res) {
    
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    });
    
});

router.post("/",middleware.isLoggedIn,function(req,res){
    //lookup campground using ID
    Campground.findById(req.params.id,function(err,campground){
       if(err){
           console.log(err);
       }else{
           Comment.create(req.body.comment,function(err,comment){
              if(err){
                  console.log(err);
              }else{
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //save comment
                  comment.save();
                  campground.comments.push(comment);
                  campground.save();
                  req.flash("success","Comment added successfully!!");
                  res.redirect("/campgrounds/" + campground._id);
              } 
           });
       } 
    });
    //create a new comment
    //connect new comment to campground
    //redirect campground show page
});

//Comment Edit Route
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
    });
    
});

//Comment Update Route
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Comment Updated successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//comment Destroy Route
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id,function(err){
      if(err){
          res.redirect("back");
      }else{
          req.flash("success","Comment Deleted successfully");
          res.redirect("/campgrounds/" + req.params.id);
      } 
   }); 
});


module.exports = router;