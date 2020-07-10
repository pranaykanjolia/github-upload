var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");



mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true});

app.use(bodyparser.urlencoded({extended : true}));




//SCHEMA SETUP
var campgroundschema= new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

var campground = mongoose.model("campground",campgroundschema);

// campground.create(
// 	{
// 		name:"Pranay Kanjolia",
// 		image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSepX2I1Z6qxq0SnKHBV9HlqfJYlF4pd0IUbt4OkQvbxbm1-jYd&usqp=CAU",
// 		description : "Hello Everyone ,This is a small description by Pranay Kanjolia"
// 	},function(err,campground){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			console.log("NEWLY CAMPGROUND CREATED");
// 			console.log(campground);
// 		}
// 	});






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

app.get("/campgrounds/:id",function(req,res){
	//res.send("THIS WOULD BE THE SHOW PAGE");
	campground.findById(req.params.id,function(err,foundcampground){
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