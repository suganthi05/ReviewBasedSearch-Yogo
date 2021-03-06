var mongoose = require("mongoose");

var yogaSchema = new mongoose.Schema({
    name: String,
    image: String,
    rating: Number,
    amenities: Array,
    classes: Array,
    beginners: Array,
    description: String,
    cost: Number,
    website: String,
    phone: String,
    location: String,
    lat: Number,
    lng: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
},{toObject:{virtuals:true},toJSON:{virtuals:true}});
yogaSchema.virtual('avg_rating').get(function(){

  return this.populate("comments").comments.reduce((a,b) => a+b.rating, this.rating)/(this.comments.length +1);

})

module.exports = mongoose.model("Yoga", yogaSchema);