var express           =  require("express");
var app               =  express();
var bodyparser        =  require("body-parser");
var mongoose          =  require("mongoose");
var campground        =  require("./models/campground");
var comment           =  require("./models/comment");
var seedDB            =  require("./seeds");
var passport          =  require("passport");
var localstrategy     =  require("passport-local");
var user              =  require("./models/user");
var campgroundRoutes  =  require("./routes/campgrounds");
var commentsRoutes    =  require("./routes/comments");
var indexRoutes       =  require("./routes/index");



//seedDB();
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true});

app.use(bodyparser.urlencoded({extended : true}));
//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"Hello Pranay Kanjolia",
	resave:false,
	saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
app.set("view engine","ejs");
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use(function(req,res,next){
	res.locals.currentuser = req.user;
	next();
});

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);
app.use("/",indexRoutes);


app.get("/",function(req,res){
	res.render("landing");
});





app.listen(3000,function(){
	console.log("YelpCamp server is running");
});