var mongoose = require("mongoose");
var Loc = mongoose.model("Location");

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

var doSetAverageRating = function(location){
    var ratingAverage, ratingTotal;
    if(location.reviews && location.reviews.length > 0){
        ratingTotal = 0;
        for(var i = 0; i < location.reviews.length; i++){
            ratingTotal = ratingTotal + location.reviews[i].rating;
        }
        ratingAverage = parseInt(ratingTotal/location.reviews.length, 10);
        location.rating = ratingAverage;
        location.save(function(err){
            if(err){
                console.log(err);
            } else {
                console.log("Average rating updated to ", ratingAverage);
            }
        });
    }
};

var updateAverageRating = function(locationid){
    Loc
    .findById(locationid)
    .select("rating reviews")
    .exec(function(err, location){
        if(!err){
            doSetAverageRating(location);
        }
    });
};

var doAddReview = function(req, res, location){
    if(!location){
        sendJsonResponse(res, 404, {"message": "locationid not found"});
    } else {
        location.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        });
        location.save(function(err, savedLocation){
            var thisReview;
            if(err){
                sendJsonResponse(res, 400, err);
            } else {
                updateAverageRating(location._id);
                thisReview = location.reviews[location.reviews.length -1];
                sendJsonResponse(res, 201, thisReview);
            }
        });
    }
};

module.exports.reviewsCreate = function(req, res){
    var locationid = req.params.locationid;
    if(locationid){
        Loc.findById(locationid)
           .select("reviews")
           .exec(function(err, location){
              if(err){
                  sendJsonResponse(res, 400, err);
              }  else {
                  doAddReview(req, res, location);
              }
           });
    } else {
        sendJsonResponse(res, 404, {"message":"Not found, locationid required"});
    }
};

module.exports.reviewsReadOne = function(req, res){
    if(req.params && req.params.locationid && req.params.reviewid){
        Loc.findById(req.params.locationid)
           .select("name reviews")
           .exec(function(err, foundLocation){
               var response, review;
               if(!foundLocation){
                   sendJsonResponse(res, 404, {"message": "locationid not found"});
                   return;
               } else if(err){
                   sendJsonResponse(res, 404, err);
                   return;
               }
               if(foundLocation.reviews && foundLocation.reviews.length > 0){
                   review = foundLocation.reviews.id(req.params.reviewid);
                   if(!review){
                       sendJsonResponse(res, 404, {"message": "review not found"});
                   } else {
                       response = {
                           location: {name: foundLocation.name, id:req.params.locationid},
                           review: review
                       };
                       sendJsonResponse(res, 200, response);
                   }
               } else {
                   sendJsonResponse(res, 404, {"message": "No reviews found"});
               }
           });
    } else {
        sendJsonResponse(res, 404, {"message":"Not found. Locationid and ReviewId are both required."});
    }
};

module.exports.reviewsUpdateOne = function(req, res){
    sendJsonResponse(res, 200, {"status":"success"});
};

module.exports.reviewsDeleteOne = function(req, res){
    sendJsonResponse(res, 200, {"status":"success"});
};