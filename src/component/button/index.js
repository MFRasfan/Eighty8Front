import React from 'react'

const Button = ({title, onClick, className, style, disabled=false}) => {
  return (
    <div 
    className={`bg-primary w-[180px] h-[40px] text-sm  md:w-[250px] md:h-[60px] rounded-md
     text-white md:text-lg font-semibold cursor-pointer flex items-center justify-center hover:shadow-lg ${className} ${style}`}
    onClick={()=>disabled?{}:onClick()}>
        <p>{title}</p>
    </div>
  )
}

export default Button