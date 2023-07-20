// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const passport = require("passport");
const session = require("express-session");
const authRouter = require("./routes/auth");
const transactionRouter = require("./routes/transactionRoute");


dotenv.config();


const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
  

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret : process.env.SECRET_1,
    resave : false,
    saveUninitialized  : false,
    cookie : {
        expires : 999999999999
    }
    
}))

app.use(passport.initialize());
app.use(passport.session());



connectDB();

app.get("/",(req,res)=>{
    if(req.isAuthenticated()){
        res.send(res.user);
    }
    else{
        console.log("false");
    }
})


app.use("/api/v1/users",authRouter);
app.use("/api/v1/transactions",transactionRouter);

app.get("/protected",(req,res)=>{
    if(req.isAuthenticated()){
        console.log("ran");
    }
    else{
        console.log("Not Found");
    }
})


const PORT = process.env.PORT;

app.listen(PORT,function (){
    console.log('Server started on port ' + PORT);
});