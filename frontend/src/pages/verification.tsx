
import React, { useEffect } from 'react'
import {motion} from 'framer-motion'
import { useRef,useState } from 'react'
import { authStore } from '../store/store'
import toast from 'react-hot-toast'


const Verification = () => {
  const[code,setCode]=useState(["", "", "", "", "", ""])
 const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const[disabled,setDisabled]=useState(true)
  const{verification}=authStore()

  const handleKeyDown=(index:number,e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==='Backspace' && !code[index] &&index>0){
      inputRef.current[index-1]?.focus()
    }
    

  }

  const handleChange=(index:number,value:string)=>{
    const newCode=[...code]
     //pasting content
     
     if(value.length>1){
         const pastedCode=value.slice(0,6).split("")
         for(let i=0; i<6; i++){
          newCode[i]=pastedCode[i] || ""

         }
         setCode(newCode)

         //focus on the pasted code

         const previousFocusedInput=newCode.findLastIndex(digit=>digit !== "")
         const toBeFocusedIndex=previousFocusedInput<5? previousFocusedInput+1 : 5
         inputRef.current[toBeFocusedIndex]?.focus()
     }else{

      //single typing OTP
      newCode[index]=value
      setCode(newCode)

      if(value && index<5){
        inputRef.current[index+1]?.focus()
      }

     }
    
  }
   const handleSubmit=async(e?:React.FormEvent<HTMLInputElement>)=>{
    if(e)
    e.preventDefault()
    const verificationCode=code.join("")
    try {
      await verification(verificationCode)
      toast.success('Email verified succesfully')
      
    } catch (error) {
      if(error instanceof Error)
        console.log(error.message)
      
    }
  }

  useEffect(()=>{
    if(code.every(digit=> digit !=='')){
      setDisabled(false)
      handleSubmit()
    }
  },[code])
 
  return (
    <div className='w-[400px] h-[250px] bg-gray-400 mx-auto my-[50px] rounded-xl p-[15px]'>
      <h1 className='mx-auto w-[200px] text-[24px] text-green-400'>Email verification</h1>
      <p>Enter the 6-digit code sent to your email</p>

      <form className=''>
        <section className='flex mx-[20px]'>
            {code.map((m,index)=>(
              <input key={index}
              type="text"
             ref={(el: HTMLInputElement | null) => {
                if (el) {
                  inputRef.current[index] = el;
                }
              }}
              maxLength={6}
              value={m}
             onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChange(index,e.target.value)}
             onKeyDown={(e)=>handleKeyDown(index,e)}
              className='bg-white my-[10px]  ml-1 w-[35px] h-[35px] focus:border-[2.5px] focus:border-green-500 text-red-500 text-[20px] rounded-lg outline-none px-[10px]'
              />
            ))}
         </section>

         <motion.button
                 disabled={disabled}
                 type='submit'
                 className='w-[150px] h-[40px] mx-[50px] mt-[10px] rounded-[10px] bg-green-500 disabled:bg-green-300 text-white '
                 whileHover={{scale:1.02,opacity:0.8}}
                 whileTap={{opacity:0.8}}
                 >
             Verify
           </motion.button>
      </form>


    </div>
  )
}

export default Verification