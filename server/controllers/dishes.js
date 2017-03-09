(function(){
    var mongoose = require('mongoose'),
        Dish = mongoose.model('Dish'),
        FoodReview = mongoose.model('FoodReview')

    function dishController(){

        this.show = function(req, res){
            var dish = Dish.findOne({_id: req.params.id}, function(err, dish){
                if (err) {
                    res.json(err);
                } else {
                    res.json(dish);
                }
            });
        }

        this.create = function(req, res){
            var dishes = Dish.find({restaurant: req.body.restaurant}, function(err, dishes){
                if (err) {
                    res.json(err);
                } else {
                    for (var i = 0; i < dishes.length; i++) {
                        if (req.body.name.toLowerCase() === dishes[i].nameLower) {
                            res.json(dishes[i]);
                        }

                        break;
                    }

                    if (i === dishes.length) {
                        var dish = new Dish({
                            name: req.body.name,
                            nameLower: req.body.name.toLowerCase();
                            restaurant: req.body.restaurant,
                            category: req.body.category,
                            rating: req.body.rating,
                            price: req.body.price
                        });

                        dish.save(function(err, dish){
                            if (err) {
                                res.json(err);
                            } else{
                                res.json(dish);
                            }
                        });
                    }
                }
            });
        }

        this.update = function(req, res){
            var reviews = FoodReview.find({dishes: req.params.id}),
                rating = 0,
                reviewCount = reviews.length;

            for (var i = 0; i < reviewCount; i++) {
                rating += reviews[i].rating;
            }

            rating = (Math.round(rating/reviewCount*10)/10).toFixed(1);

            var dish = Dish.findOne({_id: req.params.id}, function(err, dish){
                if (err) {
                    res.json(err);
                } else{
                    if (req.body.name && dish.name !== req.body.name) {
                        dish.name = req.body.name;
                        dish.nameLower = req.body.name.toLowerCase();
                    }
                    if (req.body.restaurant && dish.restaurant !== req.body.restaurant) {
                        dish.restaurant = req.body.restaurant;
                    }
                    if (req.body.category && dish.category !== req.body.category) {
                        dish.category = req.body.category;
                    }
                    if (dish.rating !== rating) {
                        dish.rating = rating;
                    }
                    if (req.body.price && dish.price !== req.body.price) {
                        dish.price = req.body.price
                    }

                    dish.save(function(err, data){
                        if (err) {
                            res.json(err);
                        } else {
                            res.json(dish);
                        }
                    })
                }
            });
        }

        this.destroy = function(req, res){
            Dish.findByIdAndRemove(req.params.id, function(err){
                if(err)res.json(err);
                else{
                    res.json(true);
                }
            });
        }
        
    }

    module.exports = new dishController();

})();