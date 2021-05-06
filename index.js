const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/authRoutes");

const app = express();

//Database Connection
require("./DatabaseConnect/mongodbConnect");

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", authRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));