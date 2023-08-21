import React from 'react'
import {  useNavigate } from 'react-router-dom'
import TestingImage from '../../../assets/cartesting.png'
import { imageURL } from '../../../store/api'

const QualityCheckPoint = ({data={}}) => {
  const navigate = useNavigate()
  return (
    <div 
    
      className=" md:h-[60vh] 
       w-full flex my-20 md:my-40 items-center"
      >
        
      <div 
    
      className='h-[100%]  md:flex items-center md:px-20'>
        
        <div className='md:w-[50%] px-10 md:pl-0 pr-20'>
          <p className='text-4xl md:text-5xl text-gray-700 pb-3 font-bold '>{data.title? data.title.split(" ")[0]:"Quality"}</p>
          <p className='text-4xl md:text-5xl text-gray-700 pb-10 font-bold '>{data.title? data.title.slice(data.title.split(" ")[0].length+1):"you can count on"}</p>

         
      <p>
      {!!data.description && data.description.split("\n").map((item,index)=>{
         return <p key={index+ Math.random()} className={` text-xl  text-gray-700 pb-4 ${index== data.description.split("\n").length-1?'mb-5':'mb-0' }`}>{item}</p>
        })}
      </p>

        </div>
        <div 
        style={{
             backgroundImage: `url(${data.image?imageURL+data.image:TestingImage})`, 
             backgroundPosition: 'center',
             backgroundSize: 'cover',
             backgroundColor:'',
             backgroundRepeat: 'no-repeat'}}
        className='w-[90%] md:w-[50%] h-[50vh] ml-5 md:ml-0  md:h-[100%] rounded-lg overflow-hidden'>
          <div  
          className='w-[100%] h-[100%]'
          style={{backgroundColor:'rgba(235, 64, 52,0.5)'}}>
           
          </div>
          </div>
      </div>
      
    </div>
  )
}

export default QualityCheckPoint