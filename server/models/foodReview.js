(function(){

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var FoodReviewSchema = new Schema({
        user: {
            type: Schema.types.ObjectId,
            ref: 'User',
            required: true
        },

        review: {
            type: String,
            trim: true
        },

        rating: {
            type: Number,
            required: true
        },

        dishes: [{
            type: Schema.Types.ObjectId,
            ref: 'Dish'
        }],

        restaurant: {
            type: Schema.Types.objectId,
            ref: 'Restaurant',
            required: true
        }
    });

    mongoose.model('FoodReview', FoodReviewSchema);

})();