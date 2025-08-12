import bcryptjs from "bcryptjs";
import User from "./schema/userSchema.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
  .then(async()=>{
    const admins=[
        {name:"suzzy",email:"suzzy@gmail.com",password:"1234", role:"admin"},
        {name:"barrack",email:"barrack@gmail.com",password:"1234", role:"admin"},
        {name:"alex",email:"alex@gmail.com",password:"1234", role:"admin"}
    ]

    for(let admin of admins){
        admin.password=await bcryptjs.hash(admin.password,10)
        await User.create(admin)
    }
    console.log("admins seeded sucessfully")
    mongoose.connection.close()
  })
  .catch(error=>console.log(error.message))

