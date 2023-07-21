import { NextFunction, Request, Response, Router } from "express";
import { Register } from "../controller/user.controller";
import passport, {PassportStatic  } from "passport";

import { checkAuth, redirectIfIsAuth } from "../middleware/auth.middleware";
import { IUser } from "../types/user.type";


const router : Router = Router();

export default function InitRoutes(passport : PassportStatic){
    router.get("/Home" , (req : Request , res : Response , next : NextFunction)=>{
        res.render("index" , {title : "Home"})
    });
    router.get("/Login" ,redirectIfIsAuth,(req : Request  , res : Response , next : NextFunction)=>{
        res.render("login" , {title : "Login"})
    });
    router.post("/Login" ,redirectIfIsAuth, passport.authenticate("local" ,{
        successRedirect : "/Profile",
        failureRedirect : "/Login",
        failureFlash : true
    }) ,async(req : Request , res : Response , next : NextFunction) => {
        res.redirect("/Profile")
    })
    router.get("/Register",redirectIfIsAuth , (req : Request , res : Response , next : NextFunction)=>{
        res.render("register" , {title : "Register"})
    });
    router.post("/Register",redirectIfIsAuth ,Register)
    router.get("/Profile" ,checkAuth, (req : Request , res : Response , next : NextFunction)=>{
        const user  = req.user
        res.render("profile" , {title : "Profile" , user})
    });
    router.get("/LogOut", checkAuth , (req : Request , res : Response , next : NextFunction)=>{
        req.logOut({keepSessionInfo :false} , (err)=>{
            if(err) console.log(err);
            res.redirect("/Login")          
             }
         )
       }
    );

    return router
}