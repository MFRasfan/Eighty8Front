import React ,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { useLocation, useParams } from 'react-router-dom'
import AuthModal from '../authModel';
import {RiNotification3Line} from 'react-icons/ri'
import { useSelector } from 'react-redux';
import { imageURL } from '../../store/api';
import Logo from '../../assets/logo.svg'
import { getAllNotifications } from '../../store/features/notification/notificationService';
import { useDispatch} from 'react-redux'

const Header = () => {
  const location = useLocation();
  const params = useParams();
  const {user}= useSelector(state=>state.auth)
  const [nameInitials, setnameInitials] = useState("UA")

  const [notificationCount, setNotificationCount] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    if(user){
      const {firstName, lastName}= user;
      if(firstName|| lastName){
        let name= firstName.charAt(0)+lastName.charAt(0)
        setnameInitials(name)
      }

    }
  }, [user])

  
  useEffect(() => {
    // Function to fetch data and update state
    const fetchData = async () => {
      try {
       await dispatch(getAllNotifications(data=>setNotificationCount(data.unRead)));
        
      } catch (error) {
        // Handle any errors here
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);

    // Clear interval when the component unmounts
    return () => clearInterval(interval);
  }, [dispatch]);

  const style={
  link:'text-gray-600 font-semibold text-lg duration-300 ease-in-out hover:text-primary cursor-pointer',
  navbrand:'text-primary font-bold text-3xl',
  headerContainer:' bg-white shadow-md justify-between px-10  h-[70px] flex items-center',
  activeLink:'text-primary font-bold'
}  

return (
  <div style={{zIndex: 999}} className='fixed  w-full top-0 '>
  <div className={style.headerContainer}>
       <div className='flex space-x-6'>
        <div>
        <Link to="/">
        <img src={Logo} className="w-14 h-14"/>

        </Link>

        </div>
        <div className='flex items-center justify-center p-1 space-x-6'>
          {/* <Link to="/shop">
            <p className={`${style.link} ${location.pathname ==='/shop'&& style.activeLink}`}>Shop Car</p>
          </Link>
           */}
        </div>
       </div>
        <div className='flex' onClick={()=>setNotificationCount(0)}>
        <Link to="/notifications">
        <p  className='bg-primary absolute px-2 ml-5 text-xs py-1 text-white rounded-full '>{notificationCount}</p>
          <RiNotification3Line size={24} className="mt-4 mx-3 hover:text-primary duration-300 ease-out"/>
          </Link>
        <Link to="/profile">
           {user.image?
           <img src={imageURL+user.image} className="w-12 h-12 rounded-full"/>:
          <div className='bg-primary w-[45px] h-[45px] flex items-center justify-center rounded-full'>
            <p className={`${style.link} hover:text-white`}>{nameInitials }</p>
          </div>
           }
          </Link>
        </div>
    </div>
  </div>
    
  )
}

export default Header