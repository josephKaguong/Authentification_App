

import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
const Input = ({icon:Icon,...props}:InputProps) => {
  return (
    <div className="relative flex items-center  mt-[10px] ">
        <Icon className="absolute  h-[20px] w-[20px] left-1 text-green-500"/>
        <input {...props} className="w-[330px] h-[40px] pl-[30px] focus:ring-2 focus:ring-blue-500 bg-gray-700 rounded-xl focus:border-2 focus:border-green-400 outline-none  text-white text-[14px]"/>
    </div>
  )
}

export default Input