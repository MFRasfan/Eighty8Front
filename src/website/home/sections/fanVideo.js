import React,{useState} from 'react'
import ReactPlayer from 'react-player/lazy'
import { imageURL } from '../../../store/api'
import Reviews from './reviews'

import { BiPlay } from 'react-icons/bi'
import { COLORS } from '../../../utils/color'
const FanVideo = ({data={}}) => {
  const [play, setplay] = useState(false)

  return (
    <div className='bg-gray-100 px-5  md:px-20 pt-20 flex items-center flex-col text-center'>
      <p className='text-4xl md:text-5xl text-gray-700 text-center -mb-20 md:mb-20 md:pt-20 font-bold'>{data.title||"Meet our biggest fans"}</p>
     
      <ReactPlayer className="-mt-40 md:mt-0"  
         onClick={()=>setplay(!play)}
          width={"100%"} 
          height={"540px"} 
          playing={play}
          url={data.video?imageURL+data.video:'https://www.youtube.com/watch?v=ysz5S6PUM-U'} />
      
       <BiPlay size={100} onClick={()=>setplay(!play)} className="-mt-72 mb-40" color={play?'transparent': COLORS.white}/>
      {/* <Reviews/> */}
      <div className='h-[36vh]'></div>
    </div>
  )
}

export default FanVideo