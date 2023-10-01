
import React from 'react'
import BannerImage from '../../../assets/banner2.jpeg'
import Button from '../../../component/button'
import {  useNavigate } from 'react-router-dom'
import { imageURL } from '../../../store/api'


const Banner = ({data={}}) => {
  const navigate = useNavigate()
  return (
    <div 
    style={{
      backgroundImage: `url(${data.image? imageURL+data.image: BannerImage})`, 
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundColor:'',
      backgroundRepeat: 'no-repeat'}}
      className="h-[90vh] w-full flex items-center"
    >
      <div className='md:w-[55%] h-[100%]'/>
      <div 
      style={{backgroundColor:'rgba(235, 64, 52,0.4)'}}
      className='h-[100%] flex items-center px-20'>
        <div className='w-[100%] md:w-[70%]'>
          <p className='text-5xl md:text-7xl font-bold text-white '>{data.title||"Car buying made easy"}</p>
          <p className='text-lg md:text-3xl font-semibold text-white py-4'>{data.description||"Shop thousands of used cars online."}</p>
          <Button title={"Shop Now"}  onClick={()=>navigate("/shop")}/>
        </div>
     
      </div>
    </div>
  )
}

export default Banner