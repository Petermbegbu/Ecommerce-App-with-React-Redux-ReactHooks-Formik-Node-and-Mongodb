const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;


const reviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false
        },
        rating: {
            type: Number,
            required: false,
        },
        comments: {
            type: String,
            required: false
        }
    },

    {timestamps: true}
)


const productSchema = new mongoose.Schema(
    {
        _user: {
            type: ObjectId,
            ref: "user",
            required: true
        },
        _category: {
            type: ObjectId,
            ref: "category",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            contentType: String,
            data: Buffer
        },
        brand: {
            type: String,
            required: false
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
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        shipping: {
            type: Boolean,
            required: false,
        },
        sold: {
            type: Number,
            default: 0
        },
    }, 

    {timestamps: true}
);




const Product = mongoose.model("product", productSchema);

module.exports = Product; 