import React from 'react'
import {Link} from 'react-router-dom'
import { useLocation, useParams } from 'react-router-dom'

const SideTab = () => {
  const location = useLocation();
  return (
    //<div className='border-[1px] md:w-[25vw]  mb-10 md:mb-0 border-gray-200'>
    <div className=' md:w-[25vw]  mb-10 md:mb-0'>
      
      <div  className={`border-[1px] px-7 py-5 hover:text-primary duration-300  border-gray-200 ${location.pathname==="/terms-and-conditions" &&"font-bold text-primary"}`}>
        <Link to="/terms-and-conditions">
        <p>Terms And conditions</p>
        </Link>
        </div>
        <div  className={`border-l-[1px] border-r-[1px]  px-7 py-5 hover:text-primary duration-300  border-l-gray-200  border-r-gray-200 ${location.pathname==="/privacy-policy" &&"font-bold text-primary"}`}>
   
        <Link to="/privacy-policy">
        <p>Privacy Policy</p>
        </Link>
        </div>
        <div  className={`border-[1px] px-7 py-5 hover:text-primary duration-300  border-gray-200 ${location.pathname==="/accessibility" &&"font-bold text-primary"}`}>
   
        <Link to="/accessibility">
        <p>Accessibility</p>
        </Link>
        </div>
    </div>
  )
}

export default SideTab