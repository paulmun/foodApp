(function(){

    var userController = require('../controllers/users.js'),
        foodReviewController = require('../controllers/foodReviews.js'),
        serviceReviewController = require('../controllers/serviceReviews.js'),
        restaurantController = require('../controllers/restaurants.js');
        

    module.exports = function(app){
        app.get('/users', function(req, res){
            userController.all(req, res);
        });
        app.get('/users/:id', function(req, res){
            userController.user(req, res);
        });
        app.post('/users', function(req, res){
            userController.create(req, res);
        });
        app.put('/users/:id', function(req, res){
            userController.update(req,res);
        });
        app.delete('/users/:id', function(req, res){
            userController.destroy(req, res);
        });

        app.get('/reviews/food/:id', function(req, res){
            foodReviewController.foodReview(req, res);
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
            serviceReviewController.serviceReview(req, res);
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

        app.get('/restaurants/:id', function(req, res){
            restaurantController.restaurant(req, res);
        });
        app.post('/restaurants', function(req, res){
            restaurantController.create(req, res);
        });
        app.put('/restaurants/:id', function(req, res){
            restaurantController.update(req, res);
        });
        app.delete('/restaurants/:id', function(req, res){
            restaurantController.destroy(req,res);
        });
    }
})();