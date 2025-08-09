import User from '../schema/userSchema.js'
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import { generateTokenandCookies } from '../utils/cookies.js'

export const signup=async(req,res)=>{
    const{name,email,password}=req.body
   try{ if(!name ||!email || !password){
        return res.status(400).json({sucess:false, message:"Input all fields"})
    }

    const user=await User.findOne({email})
    if(user){
        res.status(400).json({sucess:false, message:"User already exist"})
    }
   const hashedPassword= await bcryptjs.hash(password,10)
   const verificationToken=Math.floor(100000+Math.random()*900000)
   const verificationTokenExpiry=Date.now()+15*60*1000

   const newUser=new User({
    name,
    email,
    password:hashedPassword,
    verificationToken:verificationToken,
    verificationTokenExpiry:verificationTokenExpiry
   })

  await  newUser.save()
  generateTokenandCookies(res, newUser._id)
   return res.status(201).json({sucess:true,message:'user created sucessfully',newUser})
   }catch(error){
      return res.status(500).json({sucess:false, message:`server error ${error.message}`})
   }

}

export const login=async(req,res)=>{
    const{email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({sucess:false, message:"User doesn't exist"})
        }
        const mpassword=await bcryptjs.compare(password,user.password)
        if(!mpassword){
            return res.status(401).json({sucess:false, message:"Wrong credentials"})
        }
        generateTokenandCookies(res, user._id)
        return res.status(200).json({sucess:true, message:"Logged sucessful",user})
    } catch (error) {
        return res.status(500).json({sucess:false, message:`server error ${error.message}`})
    }
}

export const logout=(req,res)=>{
    res.clearCookie("token")
    return res.status(200).json({sucess:true, message:"Logged ou sucessfully"})
}

export const verify=async(req,res)=>{
    const{code}=req.body
    try {
        const user=await User.findOne({verificationToken:code})
        if(!user){
            return res.status(400).json({sucess:false,message:"Invalid or Expired Verification code "})
        }
        
            user.isVerified=true,
           user.verificationToken=undefined,
            user.verificationTokenExpiry=undefined

            await user.save()
        
        return res.status(200).json({sucess:true,message:"verified sucessful",user})
    } catch (error) {
          return res.status(500).json({sucess:false, message:`server error ${error.message}`})
    }
}

export const forgotPassword=async(req,res)=>{
    const{email}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({sucess:false,message:"user not found"})
        }
        user.forgotPasswordToken=crypto.randomBytes(15).toString("hex")
        user.forgotPasswordTokenExpiry=Date.now()+5*60*1000

        await user.save()

        return res.status(200).json({sucess:true, message:"Token set sucessfully",user})
    } catch (error) {
          return res.status(500).json({sucess:false, message:`server error ${error.message}`})
    }


}

export const reset=async(req,res)=>{
    const{password}=req.body
    const{token}=req.params
    try {
        const user= await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}})
        if(!user){
            return res.status(400).json({sucess:false,message:"Invalid or Expired token"})
        }
        const hashedPassword=await bcryptjs.hash(password,10)
        user.forgotPasswordToken=undefined
        user.forgotPasswordTokenExpiry=undefined
        user.password=hashedPassword

        await user.save()
        return res.status(200).json({sucess:true, message:"Password reset sucessfully",user})
    } catch (error) {
         console.log(error.message)
         return res.status(500).json({sucess:false, message:`server error ${error.message}`})
        
        
    }
}

export const checkauth=async(req,res)=>{
    try {
        const user=await User.findById(req.userId).select('-password')
        if(!user){
            return res.status(400).json({sucess:false, message:"User not found"})
        }

        res.status(200).json({sucess:true, message:"Authorized",user})
    } catch (error) {
          return res.status(500).json({sucess:false, message:`server error ${error.message}`})
    }
}