var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
var campground=require("./models/campground");
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
			res.render("index",{campgrounds:campgrounds});
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
	res.render("new");
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
			res.render("show",{campground:foundcampground});
		}
	})
	
})


app.listen(3000,function(){
	console.log("YelpCamp server is running");
})