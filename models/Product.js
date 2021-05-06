const mongoose = require("mongoose");



const reviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
        },
        comments: {
            type: String,
            required: true
        }
    },

    {timestamps: true}
)


const productSchema = new mongoose.Schema(
    {
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user"
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: [true, "Please enter a Brand name"]
        },
        category: {
            type: String,
            required: [true, "Please enter a Category"]
        },
        description: {
            type: String,
            required: true
        },

        reviews: [reviewSchema],

        rating: {
            type: Number,
            required: true,
            default: 0
        },
        numOfReviews: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0
        },
    }, 

    {timestamps: true}
);




const Product = mongoose.model("product", productSchema);

module.exports = Product; 