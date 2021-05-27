const mongoose = require("mongoose");



const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 15,
            unique: true
        }
    }, 

    {timestamps: true}
);




const Category = mongoose.model("category", categorySchema);

module.exports = Category;