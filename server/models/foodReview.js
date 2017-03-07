(function(){

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var FoodReviewSchema = new Schema({
        user: {
            type: Schema.types.ObjectId,
            ref: 'User'
        },

        review: {
            type: String,
            trim: true
        },

        rating: {
            type: Number
        },

        dishes: [{
            type: Schema.Types.ObjectId,
            ref: 'Dish'            
        }],

        restaurant: {
            type: String,
            required: true,
            trim: true
        },
    });

    mongoose.model('FoodReview', FoodReviewSchema);

})();