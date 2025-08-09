import express from 'express'
import { login, signup, logout, verify, forgotPassword, reset, checkauth} from '../controllers/usercontrollers.js'
import { verifyToken } from '../middleware/verifyToken.js'

const Router=express.Router()

Router.get('/checkauth',verifyToken,checkauth)
Router.post('/signup',signup)
Router.post('/login',login)
Router.post('/logout',logout)
Router.post('/verify',verify)
Router.post('/forgot',forgotPassword)
Router.post('/reset/:token',reset)


export default Router