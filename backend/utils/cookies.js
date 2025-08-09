import jwt from 'jsonwebtoken'

export const generateTokenandCookies=(res,userId)=>{
    const token=jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:"7d"})
    res.cookie("token",token,{httpOnly:true,sameSite:"Strict", maxAge:7*24*60*60*1000})
    return token

}