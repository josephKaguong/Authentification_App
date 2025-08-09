import {create} from 'zustand'
import axios from 'axios'

axios.defaults.withCredentials=true

const API_URI=import.meta.env.MODE==='development'? "http://localhost:5000/api/auth" : '/api/auth'


 interface auth{
    signup:(name:string, email:string,password:string)=>Promise<void>
    verification:(code:string)=>Promise<void>
    login:(email:string, password:string)=>Promise<void>
    checkAuth:()=>Promise<void>
    error:string | null
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user:any 
    isAuthenticated: boolean
    isLoading:boolean
    
}

export const authStore=create<auth>((set)=>({
   user:null ,
   error:null,
   isAuthenticated:false,
   isLoading:false,
   signup:async(name,email,password)=>{
    try {
        const response=await axios.post(`${API_URI}/signup`,{name,email,password})
        set({user:response?.data?.user})
        
    } catch (error ) {
        if(axios.isAxiosError(error)){
             set({error:error.response?.data?.message || 'error signing up'})
        }else{
            set({error:'unknown error occured'})
        }
       
    }
    
   },
   verification:async(code)=>{
    try {
        const response=await axios.post(`${API_URI}/verify`,{code})
        set({user:response.data.user,isAuthenticated:true})
        
    } catch (error) {
        if(axios.isAxiosError(error)){
             console.log(error.message)
        }
        
    }
   },
   login:async(email,password )=>{
    try {
        await axios.post(`${API_URI}/login`,{email,password})
    } catch (error) {
        if(axios.isAxiosError(error)){
            set({error:error?.response?.data.message})
            console.log(error)
        }
        
    }
   },
   checkAuth:async()=>{
      try {
        const response=await axios.get(`${API_URI}/checkauth`)
        set({user:response?.data?.user,isAuthenticated:true})
      } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error)
        }
      }
   }

}))