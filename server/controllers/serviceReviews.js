(function(){
    var mongoose = require('mongoose'),
        ServiceReview = mongoose.model('ServiceReview');
        Restaurant = mongoose.model('Restaurant');

    function serviceReviewController(){

        this.all = function(req, res){
            var serviceReviews = ServiceReview.find().exec(function(err, serviceReviews){
                if (err) {
                    res.json(err);
                }
                res.json(serviceReviews);
            });
        }

        this.show = function(req, res){
            var serviceReview = ServiceReview.findOne({_id: req.params.id}, function(err, serviceReview){
                if (err) {
                    res.json(err);
                } else {
                    res.json(serviceReview);
                }
            });
        }    

        this.create = function(req, res){

            var serviceReview = new ServiceReview({
                user: req.body.user,
                title: req.body.title,
                review: req.body.review,
                rating: req.body.rating,
                restaurant: req.body.restaurant
            });

            serviceReview.save(function(err, serviceReview){
                if (err) {
                    res.json(err);
                } else {
                    var restaurant = Restaurant.findOne({_id: req.body.restaurant}, function(err, restaurant) {
                        restaurant.serviceTot += serviceReview.rating;
                        restaurant.serviceReviews.push(serviceReview._id);
                        restaurant.serviceRating = (Math.round(restaurant.serviceTot/restaurant.serviceReviews.length*10) / 10).toFixed(1);
                        restaurant.rating = (Math.round((restaurant.serviceTot + restaurant.foodTot)/(restaurant.serviceReviews.lengh + restaurant.foodReviews.length) * 10) / 10).toFixed(1);

                        restaurant.save(function(err, restaurant){
                            if (err) {
                                res.json(err);
                            } else {
                                res.json(serviceReview);
                            }
                        });
                    });
                    res.json(serviceReview);
                }
            });
        }

        this.update = function(req, res){
            var diff;
            var serviceReview = ServiceReview.findOne({_id: req.params.id}, function(err, serviceReview){
                if (err) {
                    res.json(err);
                } else {
                    for (var i = 0; i < req.body.dishes.length; i++) {
                        rating += req.body.dishes[i].rating;
                        tray.push(req.body.dishes[i]._id);
                    }

                    if (serviceReview.title !== req.body.title) {
                        serviceReview.title = req.body.title;
                    }
                    if (serviceReview.review !== req.body.review) {
                        serviceReview.review = req.body.review;
                    }
                    if (serviceReview.rating !== rating) {
                        diff = serviceReview.rating - req.body.rating;
                        serviceReview.rating = rating;
                    }


                    serviceReview.save(function(err, data){
                        if (err) {
                            res.json(err);
                        } else {
                            var restaurant = Restaurant.findOne({_id: req.serviceReview.restaurant}, function(err, restaurant){
                                if (err) {
                                    res.json(err);
                                } else {
                                    restaurant.serviceTot -= diff;
                                    restaurant.rating = (Math.round((restaurant.serviceTot + restaurant.foodTot)/(restaurant.serviceReviews.lengh + restaurant.foodReviews.length) * 10) / 10).toFixed(1);
                                }
                            });
                        }
                    })
                }
            });
        }

        this.destroy = function(req, res){
            var review = ServiceReview.findByIdAndRemove(req.params.id, function(err){
                if (err) {
                    res.json(err);
                } else{
                    var restaurant = Restaurant.findOne({_id: review.restaurant}, function(err, restaurant){
                        if (err) {
                            res.json(err);
                        } else {
                            restaurant.serviceTot -= review.rating;
                            restaurant.rating = (Math.round((restaurant.serviceTot + restaurant.foodTot)/(restaurant.serviceReviews.length + restaurant.foodReviews.length) * 10) / 10).toFixed(1);
                            restaurant.save(function(err, upRes) {
                                if (err) {
                                    res.json(err);
                                } else {
                                    res.json(review);
                                }
                            });
                        }

                    });
                    res.json(true);
                }
            });
        }
    }

    module.exports = new serviceReviewController();

})();