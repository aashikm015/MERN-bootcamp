const express=require("express");

const app=express();

const port=8000;

app.get("/Home",(req,res)=>{
    return res.send(" Home Dashboard");
});

const isloggedIn = (req,res,next) => {
    console.log("It is logged...");
    next();
};

const isAdmin = (req,res,next) => {
    console.log("isAdmin is running");
    next();
};




const admin =(req,res)=>{
    return res.send("this is admin dashboard");
};

app.get("/admin",isloggedIn,isAdmin,admin);


app.get('/login', (req,res)=>{
    return res.send("you are visiting login route");
});

app.listen(port,()=>{
    console.log("server is up and running...");
});

// const port = 3000

// app.get('/',(req,res)=>res.send('Hello World'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))