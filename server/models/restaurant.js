(function(){

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var RestaurantSchema = new Schema({
        owner: {
            type: Schema.types.ObjectId,
            ref: 'User',
            required: true
        },

        name: {
            type: String,
            trim: true,
            required: true
        },

        loc: {
            x: {
                type: Number,
                required: true
            },
            y: {
                type: Number,
                required: true
            }
        },

        rating: {
            type: Number,
            default: 0
        },

        foodRating: {
            type: Number,
            default: 0,
            totRatings: {
                type: Number
                default: 0
            }
        },

        serviceRating: {
            type: Number,
            default: 0,
            totRatings: {
                type: Number
                default: 0
            }
        }

    });

    mongoose.model('Restaurant', RestaurantSchema);

})();