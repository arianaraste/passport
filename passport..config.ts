import { NextFunction, Request, Response } from "express";
import passport, { DoneCallback, PassportStatic } from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import { IUser } from "./types/user.type";
import { UserModel } from "./model/user.model";
import { compareSync } from "bcrypt";
export async function passportInit(Passport : PassportStatic){
    async function authenticatedUser(username : string , password : string , done : DoneCallback){
        try {

            const user : IUser | null = await UserModel.findOne({username})
            if(!user) return done(null , false  , {message : "can not find user"})
            if(compareSync(password , user.password)) return done(null , user)
            return done(null , false  , {message : "username or password invalid"})
        } catch (err) {
            done(err)
        }
    }
    const local : LocalStrategy = new LocalStrategy({usernameField : "username" , passwordField : "password"},authenticatedUser);
    const serializeUser = passport.serializeUser((user, done)=>{
        return done(null ,user)
    });
    const deserializeUser  = passport.deserializeUser(async(id,done)=>{
        const user : IUser | null = await UserModel.findOne({_id : id});
        if(!user)return done(null , false  , {message : "can not find user"});
        return done(null , user)
    });
    passport.use("local" , local , serializeUser , deserializeUser);
}
