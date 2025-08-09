import {motion} from 'framer-motion'
import Input from '../components/input'
import { Mail, KeyRound,UserRound, Loader } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengh from '../components/passwordStrengh'
import { authStore } from '../store/store'

const Signup = () => {

    const[name,setName]=useState<string>('')
    const[email,setEmail]=useState<string>('')
    const[password,setPassword]=useState<string>('')
    const navigate=useNavigate()
    const{signup,user,isLoading,isAuthenticated}=authStore()

    const handleSubmit=async(e:React.FormEvent<HTMLElement>)=>{
      e.preventDefault()

      try {
         await signup(name,email,password)
         navigate('/verification')
         console.log(user)
         console.log(isAuthenticated)
      } catch (error ) {
         if(error instanceof Error)
         console.log(error.message)
         
      }
    }

  return (
      <div className="relative w-[400px] h-[500px] mx-auto mt-[50px] rounded-xl bg-gray-400">
        <h1 className="text-[25px] text-green-400 font-medium  p-[15px]">Register</h1>
         
         <form onSubmit={handleSubmit} className="flex flex-col justify-center  p-[15px]">
            <Input
               type='text'
               icon={UserRound}
               placeholder="User name"
               value={name}
               onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}
            />
            <Input
               type='email'
               icon={Mail}
               placeholder="Email"
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

            <PasswordStrengh password={password}/>

           <motion.button
                 type='submit'
                 className='w-[150px] h-[40px] mx-auto mt-[10px] rounded-[10px] bg-green-500 text-white '
                 whileHover={{scale:1.02,opacity:0.8}}
                 whileTap={{opacity:0.8}}
                 >
             {isLoading? <Loader className='animate-spin'/>: <p>Signup</p>}
           </motion.button>
           
         </form>
         <div className="absolute w-full h-[50px] p-[10px] rounded-b-xl bottom-0 bg-black">
            <p className="text-[16px] text-white">Already have an account?<Link to="/login"><span className="text-green-400">Login</span></Link></p>
         </div>
    </div>
  )
}

export default Signup