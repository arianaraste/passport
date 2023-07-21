import express from "express"
import { Application} from "express";
import layout from "express-ejs-layouts";
import mongoose from "mongoose";
import http, { Server } from "http";
import { General } from "./types/enum";
import flash from "express-flash";
import session from "express-session";
import allRoutes  from "./routes/index.routes";
import { notFund, serverError } from "./util/error.handeler";
import passport from "passport";
import { passportInit } from "./passport..config";

//Connection

const app : Application = express();
const server : Server = http.createServer(app);
mongoose.connect("mongodb://localhost:27017/passport" , {}).then(()=>{console.log("connected to DB")}).catch((err)=>{console.log(err)});

//Setup Application
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(flash())
//Setup view engin and layouts 
app.use(layout);
app.set("view engine" , "ejs");
app.set("layout" , "./layout/main.ejs");
//Setup session
app.use(session({
    secret : "Promise",
    resave : false ,
    saveUninitialized : false
}))
//Setup passport
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())
//Routes
app.use(allRoutes(passport))
app.use(notFund);
app.use(serverError)
const PORT : number = General.PORT ||3000;
app.listen(PORT , ()=>{
    console.log("server run on PORT" + PORT , `HTTP://LOCALHOST:${PORT}/Home`);  
})
