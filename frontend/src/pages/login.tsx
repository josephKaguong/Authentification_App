import Input from "../components/input"
import { useState } from "react"
import { Mail,KeyRound  } from 'lucide-react';
import {motion} from 'framer-motion'
import { Link } from "react-router-dom";
import { authStore } from "../store/store";

const Login = () => {
  const[email,setEmail]=useState<string>('')
  const[password,setPassword]=useState<string>('')
  const{login,error}=authStore()

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault()
    try {
      await login(email,password)
    } catch (error) {
      if(error instanceof Error){
        console.log(error.message)
      }
      
    }
  }

  return (
    <div className="relative w-[400px] h-[300px] mx-auto mt-[50px] rounded-xl bg-gray-400">
        <h1 className="text-[25px] text-green-400 font-medium  p-[15px]">Welcome Back</h1>
         
         <form onSubmit={handleSubmit} className="flex flex-col justify-center  p-[15px]">
            <Input
               type='email'
               icon={Mail}
               placeholder="User name"
               value={email}
               onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
            />
            <Input
               type='password'
               icon={KeyRound}
               placeholder="Password"
               value={password}
               onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}
            />
            <p className='text-red-400'>{error}</p>

           <motion.button 
                 className='w-[150px] h-[40px] mx-auto mt-[10px] rounded-[10px] bg-green-600 text-white '
                 whileHover={{scale:1.02,opacity:0.8}}
                 whileTap={{opacity:0.8}}
                 >
             Login
           </motion.button>
           
         </form>
         <div className="absolute w-full h-[50px] p-[10px] rounded-b-xl bottom-0 bg-black">
            <p className="text-[16px] text-white">Don't have an account?<Link to="/signup"><span className="text-green-400">Signup</span></Link></p>
         </div>
    </div>
  )
}

export default Login
