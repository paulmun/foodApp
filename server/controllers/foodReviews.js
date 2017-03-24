(function(){
    var mongoose = require('mongoose'),
        FoodReview = mongoose.model('FoodReview');
        Dish = mongoose.model('Dish');
        Restaurant = mongoose.model('Restaurant');

    function foodReviewController(){

        this.all = function(req, res){
            var foodReviews = FoodReview.find().exec(function(err, foodReviews){
                if (err) {
                    res.json(err);
                }
                res.json(foodReviews);
            });
        }

        this.show = function(req, res){
            var foodReview = FoodReview.findOne({_id: req.params.id}, function(err, foodReview){
                if (err) {
                    res.json(err);
                } else {
                    res.json(foodReview);
                }
            });
        }        

        this.create = function(req, res){
            var tray = [],
                rating = 0;

            for (var i = 0; i < req.body.dishes.length; i++) {
                rating += req.body.dishes[i].rating;
                tray.push(req.body.dishes[i]._id);
            }

            var foodReview = new FoodReview({
                user: req.body.user,
                review: req.body.review,
                rating: (Math.round(rating/req.body.dishes.length*10) / 10).toFixed(1),
                dishes: tray,
                restaurant: req.body.restaurant
            });

            foodReview.save(function(err, foodReview){
                if (err) {
                    res.json(err);
                } else {
                    for (var x = 0; x < tray.length; x++) {
                        var dish = Dish.findOne({_id: tray[i]}, function(err, dish){
                            if (err) {
                                res.json(err);
                            } else {
                                dish.reviews.push(foodReview._id);
                                dish.totalScore += foodReview.rating;
                                dish.rating = (Math.round(dish.totalScore/dish.reviews.length*10)/10.toFixed(1);
                            }
                        });
                    }

                    var restaurant = Restaurant.findOne({_id: req.body.restaurant}, function(err, restaurant) {
                        restaurant.foodTot += foodReview.rating;
                    });
                    res.json(foodReview);
                }
            });
        }

        this.update = function(req, res){
            var foodReview = FoodReview.findOne({_id: req.params.id}, function(err, foodReview){
                if (err) {
                    res.json(err);
                } else{
                    var tray = [],
                        rating = 0;

                    for (var i = 0; i < req.body.dishes.length; i++) {
                        rating += req.body.dishes[i].rating;
                        tray.push(req.body.dishes[i]._id);
                    }

                    if (foodReview.user !== req.body.user) {
                        foodReview.user = req.body.user;
                    }
                    if (foodReview.review !== req.body.review) {
                        foodReview.review = req.body.review;
                    }
                    if (foodReview.rating !== rating) {
                        foodReview.rating = rating;
                    }
                    if (foodReview.dishes !== tray) {
                        foodReview.dishes = tray;
                    }


                    foodReview.save(function(err, data){
                        if (err) {
                            res.json(err);
                        } else {
                            res.json(foodReview);
                        }
                    })
                }
            });
        }

        this.destroy = function(req, res){
            FoodReview.findByIdAndRemove(req.params.id, function(err){
                if (err) {
                    res.json(err);
                } else{
                    res.json(true);
                }
            });
        }
    }

    module.exports = new foodReviewController();

})();