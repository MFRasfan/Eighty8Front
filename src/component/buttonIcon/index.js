import React from 'react'

const ButtonIcon = ({children, className="", disabled=false, onPress}) => {
    const btnStyle={
        btn:'text-blue w-12 flex items-center justify-center h-12 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:shadow-md'
    }
  return (
    <div 
    onClick={disabled?{}: onPress}
    className={`${btnStyle.btn} ${className} ${disabled && "bg-slate-400"} `}>{children}</div>
  )
}

export default ButtonIcon