const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/authRoutes");
const {isSignedIn} = require("./middlewares/appMiddlewares");
const categoryRoute = require("./routes/categoryRoutes");
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const path = require("path");

const app = express();

//Database Connection
require("./DatabaseConnect/mongodbConnect");

//middlewares
app.use(morgan("dev")); 
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoute);
// app.use("/api", isSignedIn);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", userRoute);

app.use("/api/uploads", express.static(path.join("uploads")));

if(process.env.NODE_ENV === "production"){
    //If express does not recognize a route, it checks the react build files.
    //Express will serve up production assets like our main.js and main.css file.
    app.use(express.static('client/build'))


    //Express will serve up index.js file if it doesnt recognize the route
    app.get('*', (req, res) => {
        res.sendFile(path.resolve((__dirname, 'client', 'build', 'index.html')));
    });
}

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));