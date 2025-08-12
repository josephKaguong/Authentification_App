import mongoose from "mongoose";

const Userschema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    isVerified:{
        type:Boolean,
    },
    lastLogged:{
        type:Date,
        default:Date.now()
    },
    verificationToken:String,
    verificationTokenExpiry:String,
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date

},{timestamps:true})

const User=mongoose.model("User",Userschema)

export default User