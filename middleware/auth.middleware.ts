import { NextFunction, Request, Response } from "express";

export function checkAuth(req : Request , res : Response , next : NextFunction){
    if(req.isAuthenticated()) return next();
    res.redirect("/Login");
};
export function redirectIfIsAuth(req : Request , res : Response , next : NextFunction){
    if(req.isAuthenticated()) return res.redirect("/Profile"); ;
    return next()
}