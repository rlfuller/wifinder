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
  var requestOptions, path;
  path = "/api/locations/" + req.params.locationid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, function(err, response, body){
    body.coords = {
      lng: body.coords[0],
      lat: body.coords[1]
    };
    //console.log("created on: " + body.reviews[0].createdOn);
    body.reviews.forEach(function(review){
      review.createdOn = moment(review.createdOn).format("MMMM Do YYYY, h:mm a");
    });

    renderDetailPage(req, res, body);
  });
};

/* GET 'add a new review' page */
module.exports.addReview = function(req, res){
    res.render("location-review-form", {
        title: "Review Starbucks on WIFInder",
        pageHeader: {title: "Review Starbucks"}
    });
};
