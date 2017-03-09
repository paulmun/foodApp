(function(){
    var mongoose = require('mongoose'),
        Restaurant = mongoose.model('Restaurant');

    function restaurantController(){

        this.all = function(req, res){
            var restaurants = Restaurant.find().exec(function(err, restaurants){
                if (err) {
                    res.json(err);
                }
                res.json(restaurants);
            });
        }

        this.show = function(req, res){
            var restaurant = Restaurant.findOne({_id: req.params.id}, function(err, restaurant){
                if (err) {
                    res.json(err);
                } else {
                    res.json(restaurant);
                }
            });
        }        

        this.create = function(req, res){
            var restaurant = new Restaurant({
                name: req.body.name,
                email: req.body.email
            });
            restaurant.save(function(err, data){
                if (err && err.errors.email.kind == 'restaurant defined') {
                    Restaurant.findOne({email: req.body.email}, function(err, restaurant){
                            if(err)res.json(err);
                            else{
                            res.json(restaurant);
                            }
                        }
                    );
                } else if(err){
                    res.json(err);
                } else{
                    res.json(data);
                }
            });
        }

        this.update = function(req, res){
            var restaurant = Restaurant.findOne({_id: req.params.id}, function(err, restaurant){
                if (err) {
                    res.json(err);
                } else{
                    if (restaurant.name !== req.body.name) {
                        restaurant.name = req.body.name;
                    }
                    if (restaurant.email !== req.body.email) {
                        restaurant.email = req.body.email;
                    }
                    if (restaurant.bio !== req.body.bio) {
                        restaurant.bio = req.body.bio;
                    }
                    if (restaurant.location !== req.body.location) {
                        restaurant.location = req.body.location;
                    }

                    restaurant.save(function(err, data){
                        if (err) {
                            res.json(err);
                        } else {
                            res.json(restaurant);
                        }
                    })
                }
            });
        }

        this.destroy = function(req, res){
            Restaurant.findByIdAndRemove(req.params.id, function(err){
                if(err)res.json(err);
                else{
                    res.json(true);
                }
            });
        }

    }

    module.exports = new restaurantController();

})();