(function(){

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var RestaurantSchema = new Schema({
        owner: {
            type: Schema.types.ObjectId,
            ref: 'User'
        },

        name: {
            type: String,
            trim: true,
            required: true
        },

        locx: {
            type: Number,
            required: true
        },

        locy: {
            type: Number,
            required: true
        },

        rating: {
            type: Number,
            default: 0
        },

        foodRating: {
            type: Number,
            default: 0
        },

        serviceRating: {
            type: Number,
            default: 0
        },

        dishes: [{
            type: Schema.types.ObjectId,
            ref: 'Dish'
        }],

        serviceReviews: [{
            type: Schema.types.objectId,
            ref: 'ServiceReview'
        }],

        foodTot: {
            type: Number,
            default: 0
        },

        serviceTot: {
            type: Number,
            default: 0
        }

    });

    mongoose.model('Restaurant', RestaurantSchema);

})();