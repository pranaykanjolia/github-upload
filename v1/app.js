var express=require("express");
var app=express();
var bodyparser=require("body-parser");

app.use(bodyparser.urlencoded({extended : true}));


//data for the campgrounds
var campgrounds=[
		{name:"Pranay Kanjolia",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSepX2I1Z6qxq0SnKHBV9HlqfJYlF4pd0IUbt4OkQvbxbm1-jYd&usqp=CAU"},
		{name:"Gunjita Kanjolia",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSepX2I1Z6qxq0SnKHBV9HlqfJYlF4pd0IUbt4OkQvbxbm1-jYd&usqp=CAU"},
		{name:"Akanksha Kanjolia",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSepX2I1Z6qxq0SnKHBV9HlqfJYlF4pd0IUbt4OkQvbxbm1-jYd&usqp=CAU"}
	]

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	res.render("campgrounds",{campgrounds:campgrounds});
});


app.post("/campgrounds",function(req,res){
	
	
	var name=req.body.name;
	var image=req.body.image;
	//get data from form 
	var newcampground={
		name:name,
		image:image
	};
	// add that to campgrounds array
	campgrounds.push(newcampground);
	
	// redirect to campgrounds page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
})



app.listen(3000,function(){
	console.log("YelpCamp server is running");
})