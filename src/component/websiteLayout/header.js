import React ,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { useLocation, useParams } from 'react-router-dom'
import AuthModal from '../authModel';
import Logo from '../../assets/logo.png'
import MobileNavbar from "./mobileNavbar";
// import ButtonSmall from "../btnSmall";
import ButtonIcon from "../buttonIcon";
import{AiOutlineMenu} from 'react-icons/ai'



const Header = () => {
  const location = useLocation();
  const params = useParams()
  const [showAuthModal, setshowAuthModal] = useState(false)
  const {user}= useSelector(state=>state.auth)
  const navigate= useNavigate()
  const [showNavModal, setshowNavModal] = useState(false);

  const style={
  link:'text-gray-600 font-semibold text-lg duration-300 ease-in-out hover:text-primary cursor-pointer',
  navbrand:'text-primary font-bold text-3xl',
  headerContainer:' bg-white shadow-md justify-between px-10 w-full h-[70px] flex items-center',
  activeLink:'text-primary font-bold'
}  

return (
  <div className='fixed z-40 w-full top-0 '>
  <div className='h-[35px] bg-secondary flex items-center justify-center text-xs md:text-sm lg:text-lg text-white font-semibold'>
      <p>New deals every week. <span className='hover:underline hover:text-primary cursor-pointer'>
        <Link to="/shop">Shop deals</Link>
        </span> </p>
  </div>
  <div className={style.headerContainer}>
       <div className='flex space-x-6'>
        <div>
        <Link to="/">
          <img src={Logo} className="w-14 h-14"/>
            {/* <p className={style.navbrand}>88 Alpha Autos</p> */}
        </Link>

        </div>
        <div className='hidden md:flex items-center justify-center p-1 space-x-6'>
          <Link to="/shop">
            <p className={`${style.link} ${location.pathname ==='/shop'&& style.activeLink}`}>Shop Car</p>
          </Link>
          <Link to="/aboutus">
            <p className={`${style.link} ${location.pathname ==='/aboutus' && style.activeLink}`}>About Us</p>
          </Link>
          <Link to="/contactus">
            <p className={`${style.link} ${location.pathname ==='/contactus'&& style.activeLink}`}>Contact Us</p>
          </Link>
        </div>
        <ButtonIcon
          className="md:hidden rounded-md bg-transparent hover:text-secondary  
          absolute right-10"
          onPress={() => setshowNavModal(!showNavModal)}
        >
          <AiOutlineMenu size={24} />
        </ButtonIcon>

       </div>
        <div className='hidden tablet:flex md:flex'>
           {!!(user && user._id)? 
           <p 
           onClick={()=>navigate(`/profile`)}
           className={`${style.link}`}>{`Welcome ${!user.firstName && !user.lastName? 'User': `${user.firstName} ${user.lastName}` } `}</p>:
           <p onClick={()=>setshowAuthModal(true)} className={`${style.link}`}>Log In  or Sign Up</p>}
        </div>
    </div>
     <AuthModal toggleModal={()=>setshowAuthModal(!showAuthModal)} showModal={showAuthModal} /> 
     <MobileNavbar
        closeModal={() => setshowNavModal(false)}
        className={`top-0 right-0 w-full  bg-white md:w-[35%] p-10  drop-shadow-md 
        fixed h-full z-40  ease-in-out duration-300 ${
          showNavModal ? "translate-x-0 " : "translate-x-full"
        }`}
      />

  </div>
    
  )
}

export default Header