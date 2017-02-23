var mongoose = require("mongoose");
var Location = require("./locations");


var data = [
    {
        name: "Starbucks",
        address: "7819 Forest Pine Dr, Charlotte, NC 28273",
        rating: 3,
        facilities: ["Coffee", "Food", "Wifi"],
        coords: [-80.904184, 35.13688],
        distance: "3.5 miles",
        openingTimes: [
                {
                        "days" : "Monday - Friday",
                        "opening" : "5:00am",
                        "closing" : "9:00pm",
                        "closed" : false
                },
                {
                        "days" : "Saturday",
                        "opening" : "5:30am",
                        "closing" : "9:00pm",
                        "closed" : false
                },
                {
                        "days" : "Sunday",
                        "opening" : "7:00am",
                        "closing" : "8:00pm",
                        "closed" : false
                }
        
            ]
    },
    {
        name: "Central Coffee Co",
        address: "1700 Camden Rd, #101, Charlotte, NC 28203",
        rating: 3,
        facilities: ["Coffee", "Food", "Wifi"],
        coords: [-80.858243, 35.213608], 
        distance: ".5 miles",
        openingTimes: [
            {
                        "days" : "Monday - Saturday",
                        "opening" : "6:00am",
                        "closing" : "8:00pm",
                        "closed" : false
                },
                {
                        "days" : "Sunday",
                        "opening" : "7:00am",
                        "closing" : "7:00pm",
                        "closed" : false
                }
            ]
    },
    {
        name: "Sugar Creek Brewing Company",
        address: "215 Southside Drive, Charlotte, NC 28217",
        rating: 3,
        facilities: ["Beer", "Food", "Wifi"],
        coords: [-80.881015, 35.18543], 
        distance: "2.3 miles",
        openingTimes: [
            {
                        "days" : "Monday - Wednesday",
                        "opening" : "4:00pm",
                        "closing" : "9:00pm",
                        "closed" : false
                },
                {
                        "days" : "Thursday",
                        "opening" : "4:00pm",
                        "closing" : "10:00pm",
                        "closed" : false
                },
                {
                        "days" : "Friday",
                        "opening" : "2:00pm",
                        "closing" : "11:00pm",
                        "closed" : false
                },
                {
                        "days" : "Saturday",
                        "opening" : "11:0am",
                        "closing" : "11:00pm",
                        "closed" : false
                },
                {
                        "days" : "Sunday",
                        "opening" : "7:00am",
                        "closing" : "7:00pm",
                        "closed" : false
                }
            ]
    }
    ];

function seedDB() {
    //remove all locations
    Location.Location.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed locations");
            //add locations
            data.forEach(function(insertedLocation){
                Location.Location.create(insertedLocation, function(err, data){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a location");
                        //add review
                        if(data.name === "Starbucks"){
                            Location.Review.create({
                                author: "Rachel Fuller",
                                rating: 3,
                                reviewText: "I've never been inside or used the wifi, but the drive-through is adequate."
                            }, function(err, createdReview){
                                if(err){
                                    console.log(err);
                                } else {
                                    //associate review to the location
                                    data.reviews.push(createdReview);
                                    data.save();
                                    console.log("created review");
                                }
                            });
                            
                            //add second review
                            Location.Review.create({
                                author: "Chester",
                                rating: 3,
                                reviewText: "Wifi is consistent, but not enough plugs. Also can tend to get too loud."
                            }, function(err, createdReview){
                                if(err){
                                    console.log(err);
                                } else {
                                    //associate review to the location
                                    data.reviews.push(createdReview);
                                    data.save();
                                    console.log("created review");
                                }
                            });
                        }
                        
                        if(data.name === "Sugar Creek Brewing Company"){
                            Location.Review.create({
                                author: "Tom Brennan",
                                rating: 2,
                                reviewText: "If you go during the week, it's quiet enought to get some work done, however during the weekends, it's pretty crazy. That said, who would want to do work at night at a brewery on a Friday or Saturday night? Sad!"
                            }, function(err, createdReview){
                                if(err){
                                    console.log(err);
                                } else {
                                    //associate review to the location
                                    data.reviews.push(createdReview);
                                    data.save();
                                    console.log("created review");
                                }
                            });
                            
                            
                        }
                    }
                });
            });
            
        }
        
    });
    
    
    
    
};


module.exports = seedDB;