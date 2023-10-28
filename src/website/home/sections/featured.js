import React from 'react'
import SVG1 from '../../../assets/featured/one.svg'
import SVG2 from '../../../assets/featured/two.svg'
import SVG3 from '../../../assets/featured/three.svg'
import SVG4 from '../../../assets/featured/four.svg'
// import SVG5 from '../../../assets/featured/five.svg'
import SVG6 from '../../../assets/featured/six.svg'
import { imageURL } from '../../../store/api'


const Featured = ({data={}}) => {
  return (
    <div className='bg-gray-50 py-20'>
      <p className='text-4xl text-gray-700 font-bold mb-10 text-center'>Our Partners</p>
      <div className='flex md:flex-row flex-col items-center justify-center md:space-x-20'>
          {(!!data.image && data.image !== undefined  &&data.image.length>0) && data.image.map((item,index)=>{
            return (
              <img src={imageURL+item} className='w-[100px] h-[100px] hover:scale-110 duration-300 ease-in-out'/>
            )
          })}
      {/* <img src={SVG1} className='w-[100px] h-[100px] hover:scale-110 duration-300 ease-in-out'/>
      <img src={SVG2} className='w-[100px] h-[100px] hover:scale-110 duration-300 ease-in-out'/>
      <img src={SVG3} className='w-[100px] h-[100px] hover:scale-110 duration-300 ease-in-out'/>
      <img src={SVG4} className='w-[100px] h-[100px] hover:scale-110 duration-300 ease-in-out'/>
      <img src={SVG6} className='w-[100px] h-[100px] hover:scale-110 duration-300 ease-in-out'/>
      <img src={SVG3} className='w-[100px] h-[100px] hover:scale-110 duration-300 ease-in-out'/> */}


      </div>
    </div>
  )
}

export default Featured