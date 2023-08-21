import React from "react";

import {useNavigate} from 'react-router-dom'
import BannerImage from '../../assets/banner2.jpeg'
import Button from '../../component/button'
import Logo from '../../assets/logo.png'

const AuthLayout = ({children}) => {
  const navigation = useNavigate();


  return (
    <div className="flex">
      
      <div className="flex flex-col items-center py-32 px-10  w-[40%] h-[100vh]">
        {/* <p className="text-primary mb-10 font-bold text-3xl">88 Alpha Autos</p> */}
        <img src={Logo} className="w-14 h-14"/>   
      
        {children}
      </div>
      <div 
    style={{
      backgroundImage: `url(${BannerImage})`, 
      backgroundPosition: 'center',
    
      backgroundSize: 'cover',
      backgroundColor:'',
      backgroundRepeat: 'no-repeat'}}
      className="h-[100vh] w-full flex items-center"
    >
      <div 
      style={{backgroundColor:'rgba(235, 64, 52,0.6)'}}
      className='h-[100%] w-[100%] flex items-center px-20'>
        <div className='w-[70%]'>
        {/* <p className='text-7xl font-bold text-white mb-10 '>Eighty Eight Alpha Autos</p> */}
          <p className='text-5xl font-bold text-white '>Car buying made easy</p>
          <p className='text-3xl font-semibold text-white py-4'>Shop thousands of used cars online.</p>
          <Button title={"Shop Now"} onClick={()=>navigation("/shop")}/>
        </div>
        {/* <div className='w-[50%] h-[100vh]'/> */}
     
      </div>
      </div>
    </div>
  );
};

export default AuthLayout;
