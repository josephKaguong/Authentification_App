
import { Check,X} from 'lucide-react'

type Props={
    password:string
}



const PasswordStrengh = ({password}:Props) => {
    const meter=[
        {rule:'Contains 8 characters or more', met:password.length>=8},
        {rule:'Contains uppercase letters', met:/[A-Z]/.test(password)},
        {rule:'Contains lowercase letters', met:/[a-z]/.test(password)},
        {rule:'Contains digits',met:/[\d]/.test(password)},
        {rule:'Contains special characters',met:/[^\w]/.test(password)}
    ]
     
   const strengthChecker = (pass: string) => {
        let strength = 0;

        if (pass.length >= 8) strength++;
        if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) strength++; 
        if (/\d/.test(pass)) strength++;    
        if (/\W/.test(pass)) strength++;    

        return strength;
};
    const strength=strengthChecker(password)
    console.log(strength)
 
    const colorPicker=(strength:number)=>{
        let color
        if(strength===1) color='bg-red-300'
        if(strength===2) color='bg-yellow-400'
        if(strength===3) color='bg-blue-300'
        if(strength===4) color='bg-green-400'
        return color
    }

    const color=colorPicker(strength)

    const strengthName=(strength:number):string=>{
        let name='weak'
        if(strength===1) name='gin'
        if(strength===2) name='fair'
        if(strength===3) name='medium'
        if(strength>=4) name='strong'
        return name
    }

    const name=strengthName(strength)

    return(
       <div>

            <section>
                <div className='flex justify-between'>
                     <p>Password strength</p>
                     <p>{name}</p>
                 </div>
                 <section className="flex">
                    {[...Array(4)].map((_,index)=>(
                        <section key={index} className='w-full'>
                            
                            <div className={`h-[10px]  mx-1 ${strength===0?'bg-gray-600': color} transition ease-in`}>
                                
                            </div>
                    </section>
                    ))}
                </section>
            </section>
       
          <section>
            {meter.map((m)=>(
                <div key={m.rule} className='flex gap-2'>
                    {m.met?<Check/> : <X/> }
                    <p className={`text-[15px] ${m.met? 'text-green-400':'text-gray-500'} transition ease-in`}>{m.rule}</p>
                </div>
            ))}
          </section>
       </div>
    )
  
}




export default PasswordStrengh