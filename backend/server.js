import express from 'express'
import dotenv from 'dotenv'
import Connect from './config/config.js'
import UserRouter from './routers/userRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

dotenv.config()

const app=express()
app.use(cors({
    origin: 'https://authentification-app-0kfn.onrender.com',
    credentials: true,

}))


app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',UserRouter)
const port=process.env.PORT


const __dirname=path.resolve()



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')))
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
} else {
  console.log('Dev mode: frontend served separately on localhost:5173')
}


app.listen(port,()=>{
    Connect()
    console.log("port 500active")
})
