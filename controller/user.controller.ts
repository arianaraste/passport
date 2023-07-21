import { NextFunction, Request, Response } from "express";
import { IUser } from "../types/user.type";
import { UserModel } from "../model/user.model";
import { hashSync } from "bcrypt";

export async function Register(req :Request , res :Response , next :NextFunction) : Promise<string|void>{

    try {
        const body : IUser = req.body;
        const user : IUser | null = await UserModel.findOne({username : body?.username});       
        const hashpassword : string = hashSync(body?.password , 10);
        body.password= hashpassword
        if(user){
            const referrer = req.header('Referrer') ?? req.headers.referer
            req.flash("error" , "username already exist");
           return res.redirect(referrer ?? "/Request")
        }

        console.log(body);
        const newUser = await UserModel.create<IUser>(body);
        console.log(newUser);
        
        res.redirect("/Login")

    } catch (error) {
        next(error)
    }

}