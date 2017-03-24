(function(){

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var ServiceReviewSchema = new Schema({
        user: {
            type: Schema.types.ObjectId,
            ref: 'User',
            required: true
        },

        title: {
            type: String,
            trim: true,
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

        restaurant: {
            type: Schema.Types.objectId,
            ref: 'Restaurant',
            required: true
        }
    });

    mongoose.model('ServiceReview', ServiceReviewSchema);

})();