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
                locx: req.body.lat,
                locy: req.body.long
            });

            Restaurant.find({locx: req.body.lat, locy: req.body.long}, function(err, rest) {
                if (err) {
                    console.log(err);
                } else {
                    if (rest.length > 0) {
                        res.json(rest);
                    } else {
                        restaurant.save(function(err, data){
                            if (err && err.errors.loc) {
                                Restaurant.findOne({loc: {x: req.body.lat, y: req.body.long}}, function(err, restaurant){
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
                }
            });
        }

        this.update = function(req, res){
            var restaurant = Restaurant.findOne({_id: req.params.id}, function(err, restaurant){
                if (err) {
                    res.json(err);
                } else{
                    if (restaurant.owner !== req.body.owner) {
                        restaurant.owner = req.body.owner;
                    }
                    if (restaurant.name !== req.body.name) {
                        restaurant.name = req.body.name;
                    }
                    if (restaurant.locx !== req.body.lat) {
                        restaurant.locx = req.body.late;
                    }
                    if (restaurant.locy !== req.body.long) {
                        restaurant.locy = req.body.long;
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