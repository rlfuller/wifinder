/* GET 'home' page */
module.exports.homelist = function(req, res){
    res.render("locations-list", {
        title: "WIFInder - find a place to work with wifi",
        pageHeader: {
            title: "WIFInder",
            strapline: "Find places to work with wifi near you!"
        }, 
        sidebar: "Looking for wifi and a seat? WIFInder helps you find places to work when out and about. Perhaps with coffee, food, or a beer? Let WIFInder help you find the place you are looking for.",
        locations: [{
            name: "Starbucks",
            address: "7819 Forest Pine Dr, Charlotte, NC 28273", 
            rating: 3,
            facilities: ["Coffee", "Food", "Wifi"],
            distance: "1.5 miles"
        },
        {
            name: "Central Coffee",
            address: "719 Louise Ave, Charlotte, NC 28204", 
            rating: 4,
            facilities: ["Coffee", "Food", "Wifi"],
            distance: "3.6 miles"
        }]
    });
};

/* GET 'detail' page */
module.exports.locationInfo = function(req, res){
    res.render("location-info", {
        title: "Starbucks",
        pageHeader: {title: "Starbucks"},
        sidebar: {context: "Starbucks is on WIFInder because it's Starbucks and we all know we can get wifi there.",
                  callToAction: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
                  },
        location: {name: "Starbucks",
                   address: "7819 Forest Pine Dr, Charlotte, NC 28273",
                   rating: 3,
                   facilities: ["Coffee", "Food", "Wifi"],
                   openingTimes: [{
                       days: "Monday - Friday",
                       opening: "5:00am",
                       closing: "9:00pm",
                       closed: false
                   },
                   {
                       days: "Saturday",
                       opening: "5:30am",
                       closing: "9:00pm",
                       closed: false
                   }, 
                   {
                       days: "Sunday",
                       opening: "7:00am",
                       closing: "8:00pm",
                       closed: false
                   }
                       ],
                reviews: [{
                    author: "Rachel Fuller",
                    rating: "3",
                    timestamp: "Feb 15, 2017",
                    reviewText: "I've never been inside or used the wifi, but the drive-through is adequate."
                }, 
                {
                    author: "Chester",
                    rating: "3",
                    timestamp: "Feb 15, 2017",
                    reviewText: "Wifi is consistent, but not enough plugs."
                }]
        }
        
    });
};

/* GET 'add a new review' page */
module.exports.addReview = function(req, res){
    res.render("location-review-form", {
        title: "Review Starbucks on WIFInder",
        pageHeader: {title: "Review Starbucks"}
    });
};