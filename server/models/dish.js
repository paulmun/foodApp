(function(){

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var DishSchema = new Schema({
        name: {
            type: String,
            required: true
        },

        nameLower: {
            type: String,
            required: true
        },
        
        restaurant: {
            type: Schema.types.ObjectId,
            ref: 'Restaurant',
            required: true
        },

        category: [{
            type: String,
            trim: true,
        }],

        rating: {
            type: Number,
            default: 0
        },

        price: {
            type: Number
        },

        reviews: [{
            type: Schema.types.ObjectId,
            ref: 'FoodReview'
        }],

        totalScore: {
            type: Number,
            default: 0
        }
    });

    mongoose.model('Dish', DishSchema);

})();