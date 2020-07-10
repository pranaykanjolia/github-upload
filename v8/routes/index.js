var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var user     = require("../models/user");


router.get("/register",function(req,res){
	res.render("register");
});

router.post("/register",function(req,res){
	var newuser= new user({username:req.body.username});
	user.register(newuser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");
		})
	});
});


//LOGIN ROUTES	
router.get("/login",function(req,res){
	res.render("login");
});

//HANDING LOGIN LOGIC
//app.post("/login",middleware,call back)
router.post("/login",passport.authenticate("local",
	{
		successRedirect : "/campgrounds",
		failureRedirect:"/login"
	}),function(req,res){
	
});


//LOGOUT ROUTES
router.get("/logout",function(req,res){
	req.logout()
	res.redirect("/campgrounds");
});

function isloggedin(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
		
};


module.exports = router;
