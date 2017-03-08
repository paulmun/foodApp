(function(){

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var UserSchema = new Schema({
        name: {
            type: String,
            trim: true,
            required: true
        },

        bio: {
            type: String,
            trim: true,
            default: ''
        },

        location: {
            type: String,
            trim: true,
            default: ''
        },

        foodReviews: [{
            type: Schema.types.ObjectId,
            ref: 'FoodReview'
        }],

        serviceReviews: [{
            type: Schema.types.ObjectId,
            ref: 'ServiceReview'
        }]


    });

    mongoose.model('User', UserSchema);

})();