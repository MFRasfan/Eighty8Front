import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='bg-gray-100 flex flex-col h-[140px] items-center justify-center space-y-5'>
          <p className='text-gray-700'>© 2023 Eighty 8 Alpha Autos Technologies Inc. All Rights Reserved.</p>
          <p className='text-gray-700 mt-4'>
            <Link to="/"><span className='hover:text-primary hover:underline duration-300 ease-in-out'>Term & Conditions</span></Link> |
            <Link to="/"> <span className='hover:text-primary hover:underline duration-300 ease-in-out'>Privacy Policy</span></Link> |
            <Link to="/"> <span className='hover:text-primary hover:underline duration-300 ease-in-out'>Accessibility</span></Link>
          </p>
        </div>
  )
}

export default Footer