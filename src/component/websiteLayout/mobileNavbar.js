import React, {useState} from 'react'
import {BiSearch} from 'react-icons/bi'
import {TbWorld} from 'react-icons/tb'
import {AiOutlineMenu, AiOutlineUser} from 'react-icons/ai'
import {BiCart} from "react-icons/bi"
import { Link, useNavigate} from 'react-router-dom'
import Logo from "../../assets/logo.svg";

const MobileNavbar = ({className, closeModal, children, isLoggedIn}) => {

  const [showLang, setshowLang] = useState(false)
  const [selectedLang, setselectedLang] = useState("ENG")
  const navigate= useNavigate()

  return (
    <div className={'fixed w-full h-full  '+className}>

    <div className='flex justify-between items-start'>
        <img src={Logo} className="w-16 h-16 -mt-5"/>
        <div className='absolute right-10 flex space-x-3'>
       {isLoggedIn &&<AiOutlineUser size={24}  onClick={()=>navigate(`/profile`)} className=" hover:text-secondary opacity-70"/>}
        
          <AiOutlineMenu size={24}   onClick={()=>closeModal()} className="  hover:text-secondary opacity-70"/>
        </div>

    </div>
      
        <ul className='mt-10 space-y-6'>
          <li className='w-28 cursor-pointer transition-all ease-in-out duration-300 hover:text-secondary'>
          <Link to="/" >
           <a>Home</a>
          </Link>
          </li>
          <li className='w-28 cursor-pointer transition-all ease-in-out duration-300 hover:text-secondary'>

          <Link to="/shop" >
          <a>Shop</a>
          </Link>
          </li>
          <li className='w-28 cursor-pointer transition-all ease-in-out duration-300 hover:text-secondary'>
          <Link to="/aboutus" >
            <a>About Us</a>
          </Link>
          </li>
          <li className='w-28 cursor-pointer transition-all ease-in-out duration-300 hover:text-secondary'>
          <Link to="/contactus" >
          <a>Contact Us</a>
          </Link>
          </li>
          {/* <li className='w-28 cursor-pointer transition-all ease-in-out duration-300 hover:text-secondary'> */}
            {children}
            {/* </li> */}
        
            {/* <li>
              <div>
                <p 
                onClick={()=>setshowLang(!showLang)}
                 className=' w-28 cursor-pointer transition-all ease-in-out duration-300 hover:text-secondary'>{selectedLang}</p>
                {showLang &&<div className='drop-shadow-lg rounded-b-md  bg-white'>
                  <p  
                  onClick={()=>{
                    setselectedLang('ENG')
                    setshowLang(false)
                    }}
                  className='py-2 cursor-pointer px-4 duration-300 ease-in-out hover:border-b-secondary border-white border-2'>English</p>
                  <p 
                  onClick={()=>{
                  setselectedLang('DUTCH')
                  setshowLang(false)
                  }}
                  className='py-2 px-4 cursor-pointer  duration-300 ease-in-out hover:border-b-secondary border-white border-2'>Dutch</p>
                </div>}
              </div>
            </li> */}
        
        </ul>

      

       
    </div>
  )
}




export default MobileNavbar