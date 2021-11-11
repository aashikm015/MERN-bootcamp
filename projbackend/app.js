require("dotenv").config();

const mongoose = require('mongoose');
const express=require("express");
const app=express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//const stripe = require("stripe")

//auth routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");
const paymentBRoutes = require("./routes/paymentBRoutes")







//DB connection
mongoose
    .connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=>{
    console.log("DB CONNECTED");
});


//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//my routes

app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",stripeRoutes);
app.use("/api",paymentBRoutes);






//PORT


 const port= process.env.PORT || 8000;

 //Starting a server

 const startingServer=()=>{console.log(`app is running at ${port}`);}

 app.listen(port,startingServer);

