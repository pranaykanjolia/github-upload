var mongoose=require("mongoose");
var campground=require("./models/campground");
var comment=require("./models/comment");

var data =[
	{
		name :"Cloud rest",
		image : "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description : "blah blah blah"
	},
	{
		name :"Smarty Snow",
		image : "https://images.unsplash.com/photo-1545572695-789c1407474c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description : "blah blah blah"
	},
	{
		name :"Night night",
		image : "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description : "blah blah blah"
	}
];




function seedDB(){
		//Remove all Campgrounds
		campground.deleteMany({},function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("removed campgrounds");
		}
		data.forEach(function(seed){
			campground.create(seed,function(err,campground){
				if(err){
					console.log(err);
				}
				else{
						console.log("Added A Campground");
						comment.create(
						{
							text:"This place is great but i wished we have internet here",
							author:"homer"
						},function(err,comment){
							if(err){
								console.log(err);
							}
							else{
								campground.comments.push(comment);
								campground.save();
								console.log("created new comment");
							}
						});
					};
				});
			});
		});
	};

module.exports=seedDB;



