const adminUsers = require("../data/adminUsers");
const products = require("../data/products");
const User = require("../models/User"); 
const Product = require("../models/Product"); 
const Order = require("../models/Order");
// require("dotenv").config();

//Database Connection
require("../DatabaseConnect/mongodbConnect");


const importData = async () => {
    try{
        const createdAdminUser = await User.create(adminUsers); //returns an array of created admin users with database id
        
        const adminId = createdAdminUser._id;

        const sampleProducts = products.map((product) => {
            return {...product, _user: adminId}
        })

        await Product.insertMany(sampleProducts);

        console.log("Data imported");
        process.exit()
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}



const destroyData = async () => {
    try{
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log("Data Destroyed");
    }catch(error){
        console.log(error)
    }
}

if(process.argv[2] === "-d"){
    destroyData();
} else {
    importData();
}