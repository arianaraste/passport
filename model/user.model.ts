import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../types/user.type";

const UserSchema = new Schema<IUser>({
    fullname : {type : String , require : true , trim : true},
    username : {type : String , require : true , unique : true},
    password : {type : String , require : true}
});

export const UserModel = mongoose.model<IUser>("User",UserSchema)