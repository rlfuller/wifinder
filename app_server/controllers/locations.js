/* GET 'home' page */
module.exports.homelist = function(req, res){
    res.render("locations-list", {title: "Home"});
};

/* GET 'detail' page */
module.exports.locationInfo = function(req, res){
    res.render("location-info", {title: "Location Info"});
};

/* GET 'add a new review' page */
module.exports.addReview = function(req, res){
    res.render("location-review-form", {title: "Add Review"});
};