var express    =  require("express");
var router     =  express.Router();
var campground =  require("../models/campground");
var comment    =  require("../models/comment");


router.get("/",function(req,res){
	campground.find({},function(err,campgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/index",{campgrounds:campgrounds});
		}
	})
	
});


router.post("/",isloggedin,function(req,res){
	
	
	var name=req.body.name;
	var image=req.body.image;
	var description=req.body.description;
	var author = {
		id : req.user._id,
		username : req.user.username
	}
	var newcampground={
		name:name,
		image:image,
		description:description,
		author : author
	};

	campground.create(newcampground,function(err,newcampground){
		if(err){
			console.log(err);
		}
		else{
			console.log("new campground created!!");
			console.log(newcampground);
		}
	})
	
	res.redirect("/campgrounds");
});

router.get("/new",isloggedin,function(req,res){
	res.render("campgrounds/new");
})
//SHOW -route
router.get("/:id",function(req,res){
	//res.send("THIS WOULD BE THE SHOW PAGE");
	campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
		if(err){
			console.log(err);
		}
		else{
			console.log(foundcampground);
			res.render("campgrounds/show",{campground:foundcampground});
		}
	})
});


function isloggedin(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
		
};

module.exports = router;
