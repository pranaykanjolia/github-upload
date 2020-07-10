var express    =  require("express");
var router     =  express.Router({mergeParams : true});
var campground =  require("../models/campground");
var comment    =  require("../models/comment");



router.get("/new",isloggedin,function(req,res){
	//find by id
	campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new",{campground : campground});
		}
	});
	
});


router.post("/",isloggedin,function(req,res){
	//lookup campground using id
	campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
		comment.create(req.body.comment,function(err,comment){
			if(err){
				console.log(err);
			}
			else{
				comment.author.id = req.user._id;
				comment.author.username = req.user.username;
				comment.save()
				campground.comments.push(comment);
				campground.save();
				console.log(comment);
				res.redirect("/campgrounds/" + campground._id);
			}
		});
			
		}
	});
	
	// create a new comment
	//connect the comment to campground
	//redirect to campground show page
});


function isloggedin(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
		
};



module.exports = router
