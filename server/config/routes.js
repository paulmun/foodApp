(function(){

    var userController = require('../controllers/users.js'),
        foodReviewController = require('../controllers/foodReviews.js'),
        serviceReviewController = require('../controllers/serviceReviews.js'),
        restaurantController = require('../controllers/restaurants.js');
        

    module.exports = function(app){
        app.get('/users', function(req, res){
            userController.all(req, res);
        });
        app.get('/user/:id', function(req, res){
            userController.show(req, res);
        });
        app.post('/user', function(req, res){
            userController.create(req, res);
        });
        app.put('/user/:id', function(req, res){
            userController.update(req,res);
        });
        app.delete('/user/:id', function(req, res){
            userController.destroy(req, res);
        });

        app.get('/reviews/food/:id', function(req, res){
            foodReviewController.show(req, res);
        });
        app.post('/reviews/food', function(req, res){
            foodReviewController.create(req, res);
        });
        app.put('/reviews/food/:id', function(req, res){
            foodReviewController.update(req, res);
        });
        app.delete('/reviews/food/:id', function(req, res){
            foodReviewController.destroy(req, res);
        });

        app.get('/reviews/service/:id', function(req, res){
            serviceReviewController.show(req, res);
        });
        app.post('/reviews/service', function(req, res){
            serviceReviewController.create(req, res);
        });
        app.put('/reviews/service/:id', function(req, res){
            serviceReviewController.update(req, res);
        });
        app.delete('/reviews/service/:id', function(req, res){
            serviceReviewController.destroy(req, res);
        });

        app.get('/restaurant/:id', function(req, res){
            restaurantController.show(req, res);
        });
        app.post('/restaurant', function(req, res){
            restaurantController.create(req, res);
        });
        app.put('/restaurant/:id', function(req, res){
            restaurantController.update(req, res);
        });
        app.delete('/restaurant/:id', function(req, res){
            restaurantController.destroy(req,res);
        });

        app.get('/dish/:id', function(req, res){
            dishController.show(req, res);
        });
        app.post('/dish', function(req, res){
            dishController.create(req, res);
        });
        app.put('/dish/:id' function(req, res){
            dishController.update(req, res);
        });
        app.delete('/restaurant/:id', function(req, res){
            dishController.destroy(req, res);
        })
    }
})();