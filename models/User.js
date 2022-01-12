const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Please enter Name"]
        },
        email: {
            type: String,
            trim: true,
            required: [true, "Please enter an Email"],
            lowercase: true,
            unique: true,
            validate: [isEmail, "Please enter a valid Email"]
        },
        password: {
            type: String,
            required: [true, "Please enter a Password"],
            minlength: [5, "Minimum password is 5 characters"]
        },
        about: {
            type: String,
            trim: true
        },
        role: {
            type: Number,
            default: 0
        },
        history: {
            type: Array,
            default: []
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    }, 

    {timestamps: true}
);


//fire a function before the document gets saved to the database
userSchema.pre("save", async function(next) {
    //Note the value of 'this' is our user model.
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
})


//A static method to login user
userSchema.statics.login = async function(email, password){
    //Note the value of 'this' is our user model.
    //check in the database to see if the user's email already exist
    const user = await this.findOne({ email });

    if (user) {
        //then we compare the password the user entered with the hashed one in our database;
        const auth = await bcrypt.compare(password, user.password) //This returns true or false;
        //Note bcrypt will hash the password before comparing it with the already hashed-
        //password in the database;

        if (auth) {
            return user;
        } else {
            throw Error("Incorrect password");
        }
    } else {
        throw Error("Incorrect Email");
    }
}


const User = mongoose.model("user", userSchema);

module.exports = User; 