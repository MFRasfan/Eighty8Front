import React,{useState, useEffect} from 'react'
import DashboardLayout from '../../component/dashboardLayout'
import { formStyle } from '../../style/adminStyle'
import 'react-quill/dist/quill.snow.css';
import {toast, ToastContainer}  from 'react-toastify';
import { toastComponent } from "../../utils/toast";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import { COLORS } from "../../utils/color";
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { BiImageAdd } from 'react-icons/bi';
import { getAccessToken, updateUserById } from '../../store/features/auth/authService';


const Settings = () => {
  
  const dispatch= useDispatch()
  const navigation = useNavigate();
  const [input, setinput] = useState({});
  const [showPassword, setshowPassword] = useState(false)
  const {user}= useSelector(state=>state.auth)

  const onInputChange = (e) => {
    setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit=async()=>{
    try {

      // if(!input.currentPassword) throw "Please enter current password"
      // if(input.currentPassword.length <8) throw "Password should be atleast 8 character long"
      
      if(!input.newPassword) throw "Please enter new password"
      if(input.newPassword.length <8) throw "Password should be atleast 8 character long"
      
      if(!input.confirmPassword) throw "Please re-enter password"
      if(input.confirmPassword.length <8) throw "Confirm Password should be atleast 8 character long"
      
      if(input.newPassword !== input.confirmPassword) throw "Password should be same"
     
      const obj={
        password:input.newPassword
      } 
      dispatch(updateUserById(user._id, obj, data=>{
  
        setTimeout(() => {
          navigation(`/`)
        }, 1000);
      }))

    } catch (error) {
      toastComponent.error(error)
    }
  }

  return (
   <DashboardLayout>
        <p className={`${formStyle.h1Dashboard} px-2`}>Account Settings</p>
     
        <p className={`${formStyle.h1Dashboard} text-lg px-2`}>Update Credentials</p>      
       <div className='md:w-[30vw]'>
        

            {/* <div >
              <label className={`${formStyle.label} font-bold`}>Current Password</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"currentPassword"} 
                    className={formStyle.input}
                    value={input.currentPassword}
                    onChange={onInputChange}
                  />
                </div>
            </div> */}

            <div >
              <label className={`${formStyle.label} font-bold`}>New Password</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"newPassword"}
                    className={formStyle.input}
                    value={input.newPassword}
                    onChange={onInputChange}
                  />
                </div>
            </div>
        

            <div >
              <label className={`${formStyle.label} font-bold`}>Confirm Password</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"confirmPassword"}
                    className={formStyle.input}
                    value={input.confirmPassword}
                    onChange={onInputChange}
                  />
                </div>
            </div>

      <button 
        onClick={()=>handleSubmit()}
        className={`rounded-md bg-secondary hover:bg-primary hover:shadow-lg  duration-300
         ease-in-out w-[100%] h-[40px] flex items-center justify-center`}
        >
            <p className="text-white font-semibold text-lg">Submit</p>
      </button>
   
      </div>
      

   </DashboardLayout>
  )
}

export default Settings