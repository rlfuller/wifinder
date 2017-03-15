var request = require("request");
var moment = require("moment");

var apiOptions = {
    server:"http://localhost:3000"
};
apiOptions.server = process.env.HEROKUPATH || "http://localhost:3000";


var renderHomePage = function(req, res, responseBody){
    res.render("locations-list",
    {
        title: "WIFInder - find a place to work with wifi",
        pageHeader: {
            title: "WIFInder",
            strapline: "Find places to work with wifi near you!"
        },
        sidebar: "Looking for wifi and a seat? WIFInder helps you find places to work when out and about. Perhaps with coffee, food, or a beer? Let WIFInder help you find the place you are looking for.",
        locations: responseBody
    });
};

var getLocationInfo = function(req, res, callback){
  var requestOptions, path;
  path = "/api/locations/" + req.params.locationid;

  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };

  request(requestOptions, function(err, response, body){
    if(response.statusCode === 200) {
      body.coords = {
        lng: body.coords[0],
        lat: body.coords[1]
      };
      //console.log("created on: " + body.reviews[0].createdOn);
      body.reviews.forEach(function(review){
        review.createdOn = moment(review.createdOn).format("MMMM Do YYYY, h:mm a");
      });

      callback(req, res, body);
    } else {
      _showError(req, res, response.statusCode);
    }

  });

};

var renderDetailPage = function(req, res, locDetail){
  res.render("location-info", {
      title: locDetail.name,
      pageHeader: {title: locDetail.name},
      sidebar: {context: "is on WIFInder because we all know we can get wifi there.",
                callToAction: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
                },
      location: locDetail

  });

};

var renderReviewForm = function(req, res, locDetail){
  res.render("location-review-form", {
      title: "Review " + locDetail.name + " on WIFInder",
      pageHeader: {title: "Review " + locDetail.name}
  });
};

var _showError = function(req, res, status){
  var title, content;

  title = status  + ": Something, somewhere, has gone just a little bit wrong.";
  content = "We can't find what you are looking for. Sorry.";

  res.status(status);
  res.render("error", {title: title, content: content});
};

/* GET 'home' page */
module.exports.homelist = function(req, res){
    var requestOptions, path;
    path = "/api/locations";
    requestOptions = {
      url: apiOptions.server + path,
      method: "GET",
      json: {},
      qs: {
          lng: -80.8641380,
          lat: 35.2189070
      }
    };
    request(requestOptions, function(err, response, body){
        console.log(err, body);
        for(var i = 0; i < body.length; i++){
          body[i].distance = _formatDistance(body[i].distance);
        }
        renderHomePage(req, res, body);
    });

    var _formatDistance = function(distance){
      var numDistance, unit;

      numDistance = parseInt(distance,10).toFixed(2);
      numDistance = Number(numDistance / 1609.344).toFixed(2); //1609.344 meters in a mile
      unit = "mi";

      return numDistance + unit;
    }
};

/* GET 'detail' page */
module.exports.locationInfo = function(req, res){
  getLocationInfo(req, res, function(req, res, responseData){
    renderDetailPage(req, res, responseData);
  });
};

/* GET 'add a new review' page */
module.exports.addReview = function(req, res){
  getLocationInfo(req, res, function(req, res, responseData){
    renderReviewForm(req, res, responseData);
  });
};

/* POST add a new review */
module.exports.doAddReview = function(req, res){
  var requestOptions, path, locationid, postdata;
  locationid = req.params.locationid;
  path = "/api/locations/" + locationid + "/reviews";
  postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };

  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };

  request(requestOptions, function(err, response, body){
    if(response.statusCode === 201){
      res.redirect("/location/" + locationid);
    } else {
      _showError(req, res, response.statusCode);
    }
  });

};
