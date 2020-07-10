var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
var campground=require("./models/campground");
var comment=require("./models/comment");
var seedDB=require("./seeds");


seedDB();
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true});

app.use(bodyparser.urlencoded({extended : true}));







app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	campground.find({},function(err,campgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/index",{campgrounds:campgrounds});
		}
	})
	
});


app.post("/campgrounds",function(req,res){
	
	
	var name=req.body.name;
	var image=req.body.image;
	var description=req.body.description;
	var newcampground={
		name:name,
		image:image,
		description:description
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

app.get("/campgrounds/new",function(req,res){
	res.render("campgrounds/new");
})
//SHOW -route
app.get("/campgrounds/:id",function(req,res){
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


//============================
// COMMENTS ROUTES
//============================



app.get("/campgrounds/:id/comments/new",function(req,res){
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

app.post("/campgrounds/:id/comments",function(req,res){
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
				campground.comments.push(comment);
				campground.save();
				res.redirect("/campgrounds/" + campground._id);
			}
		});
			
		}
	});
	
	// create a new comment
	//connect the comment to campground
	//redirect to campground show page
	
	
	
})

















app.listen(3000,function(){
	console.log("YelpCamp server is running");
})