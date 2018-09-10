var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    flash = require("connect-flash"),
    methodOverride =require("method-override"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"), 
    seedDB = require("./seeds"); 
    
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes  = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seed the database

//Passport configuration
app.use(require("express-session")({
    secret:"YelpCamp",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //encode data into session
passport.deserializeUser(User.deserializeUser());//decode data

app.use(function(req,res,next){
    
    res.locals.currentUser = req.user;
    res.locals.error= req.flash("error");
    res.locals.success = req.flash("success");
    next();
    
});

app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/",indexRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The YelpCamp Server Has Started!!");
});