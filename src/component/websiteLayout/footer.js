import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {FaFacebookF, FaTwitter, FaLinkedin} from 'react-icons/fa'
import{FiInstagram} from 'react-icons/fi'
import{GrTictok} from 'react-icons/gr'
import AutoTraderBestPriced2021 from '../../assets/AutoTraderBestPriced2021.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getContact} from '../../store/features/webcontent/webContentService';

const Footer = () => {
  const dispatch = useDispatch()
  const [contactDetails, setcontactDetails] = useState({});
  const contact = useSelector((state) => state.webContent.contactDetails);
  
  useEffect(() => {
    if (contact.length === 0) {
      dispatch(getContact((data) =>{
        console.log(data)
        if(data[0] ){
          setcontactDetails(data[0]) 
          }
        
    }));
    }else{
      setcontactDetails(contact[0]);
    }
  }, [dispatch, contact]);
  
  return (
    <div>

   
      <div class="md:h-[80vh] bg-white pt-20 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className='px-20 flex flex-col space-y-5'>
              <p className='text-3xl text-gray-700 font-bold'>EXPLORE COMPANY</p>
              <Link to="/"> <p className='text-gray-700 hover:text-primary hover:font-semibold duration-300 ease-in-out '>Home </p> </Link>
              <Link to="/shop"> <p className='text-gray-700 hover:text-primary hover:font-semibold duration-300 ease-in-out '>Shop
               </p> </Link>
           
              <Link to="/aboutus"> <p className='text-gray-700 hover:text-primary hover:font-semibold duration-300 ease-in-out '>About Us</p> </Link>
              <Link to="/contactus"> <p className='text-gray-700 hover:text-primary hover:font-semibold duration-300 ease-in-out '>Contact Us </p> </Link>
          </div>

            <div className='px-20 flex flex-col space-y-5'>
                  <p className='text-3xl text-gray-700 font-bold'>Contact Us</p>
                  <Link to="/"> <p className='text-gray-700 hover:text-primary hover:font-semibold duration-300 ease-in-out '>Chat with us </p> </Link>
                  <Link to="/aboutus"> <p className='text-gray-700 hover:text-primary hover:font-semibold duration-300 ease-in-out '>Call us at {contactDetails.phoneSecondary}</p> </Link>
                  <Link to="/contactus"> <p className='text-gray-700 hover:text-primary hover:font-semibold duration-300 ease-in-out '>Email us at {contactDetails.emailSecondary} </p> </Link>
                  <Link to="/"> <p className='text-gray-700 hover:text-primary hover:font-semibold duration-300 ease-in-out '>Locations </p> </Link>

                  <div className='flex pt-5 space-x-4'>
                    <a target={"_blank"} href={contactDetails.fb||"/"}>
                    <FaFacebookF size={25} className={"text-black cursor-pointer hover:text-primary duration-300 ease-in-out"}/>
                    </a>
                    <a target={"_blank"} href={contactDetails.instagram||"/"}>
                    <FiInstagram size={25} className={"text-black cursor-pointer hover:text-primary duration-300 ease-in-out"}/>
                    </a>
                    <a target={"_blank"} href={contactDetails.linkedIn||"/"}>
                    <FaLinkedin size={25} className={"text-black cursor-pointer hover:text-primary duration-300 ease-in-out"}/>
                    </a>
                    <a target={"_blank"} href={contactDetails.twitter||"/"}>
                    <FaTwitter size={25} className={"text-black cursor-pointer hover:text-primary duration-300 ease-in-out"}/>
                    </a>
                  </div>
            </div>
            <div className='flex mt-20 items-center justify-center'>
              <img src={AutoTraderBestPriced2021} className="w-[250px] h-[250px]"/>
            </div>
        </div>
        <div className='h-[15vh]'></div>
        <div className='bg-gray-100 flex flex-col  h-[140px] items-center justify-center space-y-5'>
          <p className='w-[70%] text-center text-gray-700'>© 2023 88 Alpha Autos Technologies Inc. All Rights Reserved.</p>
          <p className='text-gray-700 mt-4'>
            <Link to="/terms-and-conditions"><span className='hover:text-primary hover:underline duration-300 ease-in-out'>Term & Conditions</span></Link> |
            <Link to="/privacy-policy"> <span className='hover:text-primary hover:underline duration-300 ease-in-out'>Privacy Policy</span></Link> |
            <Link to="/accessibility"> <span className='hover:text-primary hover:underline duration-300 ease-in-out'>Accessibility</span></Link>
          </p>
        </div>
      </div>
  )
}

export default Footer