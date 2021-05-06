const mongoose = require("mongoose");
require("dotenv").config();


//Database Connection
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log("DB is Connected")).catch((error) => console.log("DB Error", error))
