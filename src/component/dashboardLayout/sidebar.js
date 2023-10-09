import React,{useEffect, useState} from 'react'
import { Link , useNavigate ,useLocation, useParams } from 'react-router-dom'
import { routes } from './routes';
import {BiLogOutCircle} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { clearTokens } from '../../store/features/auth/authSlice';

const Sidebar = () => {
  const location = useLocation();
  const params = useParams()
  const dispatch=useDispatch()
  const navigation= useNavigate()
  const [linkList, setlinkList] = useState([])
  const {user} = useSelector((state) => state.auth);
  // const [role, setrole] = useState('admin')



  const [role, setrole] = useState("");

  useEffect(() => {
    if (user && user.role) {
      setrole(user.role.role);
    }
  }, [user]);

  useEffect(() => {
    if(role && routes[user?.role?.role] && routes[user?.role?.role].length){
      setlinkList(routes[user?.role?.role])
    }
    
  }, [role])

const handleLogout=()=>{
  dispatch(clearTokens())
  navigation("/")

}

  return (
    <div className={`h-[150vh] w-[17%] border-r-gray-100 border-r-2  rounded-md  mt-24 `}>
      {linkList.map((item,index)=>(
        <Link to={item.route}>
          <div   
          className={`text-secondary/80 flex md:space-x-4 hover:bg-primary p-4 rounded-sm
          hover:text-white duration-300 text-sm  w-full 
           ${location.pathname ===item.route && 'bg-secondary/80 rounded-sm  text-white/100'}`}>
            <item.icon size={22}  />
            <p className='hidden md:block'> {item.name}  </p>
          </div>
        </Link>
      ))}
       <div   
         onClick={()=>handleLogout()}
          className="text-secondary/60 flex text-sm space-x-4 hover:bg-primary
          p-4
          hover:text-white duration-300  rounded-md w-full h-[55px]">
            <BiLogOutCircle size={22}  />
            <p  className='hidden md:block'> Logout</p>
          </div>
    </div>
  )
}

export default Sidebar