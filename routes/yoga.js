var express = require("express");
var router  = express.Router();
var Yoga = require("../models/yoga");
var middleware = require("../middleware");
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

var geocoder = NodeGeocoder(options);

//INDEX - show all campgrounds
router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search){
       const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    // Get all campgrounds from DB
    Yoga.find({name: regex}, function(err, allYoga){
       if(err){
           console.log(err);
       } else {
           if(allYoga.length < 1){
               noMatch = "No trails match that query, please try again.";
           }
          res.render("yoga/index",{yoga:allYoga, noMatch: noMatch});
       }
    });
    } else {
         // Get all campgrounds from DB
    Yoga.find({}, function(err, allYoga){
       if(err){
           console.log(err);
       } else {
          res.render("yoga/index",{yoga:allYoga, noMatch: noMatch});
       }
     });
    }
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var cost = req.body.cost;
  var rating = req.body.rating;
  var amenities = req.body.amenities;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      console.log(err);
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newYoga = {name: name, image: image, rating: rating, amenities: amenities, description: desc, author:author, cost: cost, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Yoga.create(newYoga, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/yoga");
        }
    });
  });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("yoga/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Yoga.findById(req.params.id).populate("comments").exec(function(err, foundYoga){
        if(err){
            console.log(err);
        } else {
            console.log(foundYoga);
            //render show template with that campground
            res.render("yoga/show", {yoga: foundYoga});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Yoga.findById(req.params.id, function(err, foundYoga){
        res.render("yoga/edit", {yoga: foundYoga});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.yoga.lat = data[0].latitude;
    req.body.yoga.lng = data[0].longitude;
    req.body.yoga.location = data[0].formattedAddress;

    Yoga.findByIdAndUpdate(req.params.id, req.body.yoga, function(err, yoga){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/yoga/" + yoga._id);
        }
    });
  });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Yoga.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/yoga");
      } else {
          res.redirect("/yoga");
      }
   });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;