import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const Connect=async()=>{
    const connect=await mongoose.connect(process.env.MONGO_URI)
    const connection=mongoose.connection

    connection.on('connected',()=>{
        console.log("mongoDb connected sucessfully")
    })

    connection.on("error", ()=>{
        console.log("Failed to connect to mongoDB server")
    })
    

}

export default Connect
