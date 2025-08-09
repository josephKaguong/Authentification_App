import jwt from 'jsonwebtoken'

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({sucess:false,message:"Unauthorized"})
    }
    try {
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        if(!decoded){
            return res.status(400).json({sucess:false, message:"Invalid token"})
        }
        req.userId=decoded.userId
        next()
    } catch (error) {
          return res.status(500).json({sucess:false, message:`server error ${error.message}`})
    }
}