import { NextFunction, Request, Response } from "express";
import { error_response } from "../types/errror.type";

export function notFund(req : Request , res : Response , next : NextFunction) : void {

    const NotFundError : error_response = {
        error_type : "not fund",
        error_status : +res.status | 404 ,
        error_message : `can not find ${req.url}`
    };
    res.send(NotFundError)



};
export function serverError(err : any ,req : Request , res : Response , next : NextFunction) : void {
    console.log(err);
    
    const serverError : error_response = {
        error_type : "serverError",
        error_status : +res.status | 500 ,
        error_message : err?.message
    };
    res.send(serverError)
};