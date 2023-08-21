import React, {useState} from 'react'
import { formStyle } from '../../style/adminStyle'
import {useDispatch} from 'react-redux'
import 'react-quill/dist/quill.snow.css';
import {toast, ToastContainer}  from 'react-toastify';
import { resetPassword, signup } from "../../store/features/auth/authService";
import {useNavigate} from 'react-router-dom'
import { toastComponent } from "../../utils/toast";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import { COLORS } from '../../utils/color';



const ResetPassword = ({setactiveTab, from,email,setemail}) => {
    const [input, setinput] = useState({})
    const dispatch= useDispatch()
    const navigation = useNavigate();
    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)
    
    
    const onInputChange=(e)=>{  
        setinput(prev=>({...prev,[e.target.name]:e.target.value}))
      }
      const handleSubmit=e=>{
        try {
          if(!input.password) throw "Please enter password"
          if(input.password.length <8) throw "Password should be atleast 8 character long"
          if(!input.confirmPassword) throw "Please re-enter password"
          if(input.confirmPassword.length <8) throw "Confirm Password should be atleast 8 character long"
          if(input.password !== input.confirmPassword) throw "Password should be same"
        
          let obj={
            email:email, 
          //  code:code,
            password: input.password
          }
          dispatch(resetPassword (obj, (data)=>{
            if(data.code && data.code !== 200){
             return toastComponent.error(data.message)
            }else{
              if(data.message){
                toastComponent.info(data.message)
                setTimeout(() => {
                  setemail(input.email)
                  setactiveTab('login')
                }, 2000);
              }
            }
          }))
    
        } catch (error) {
          toastComponent.error(error)
        }
      }
  return (
    <div className='p-5'>
        <p className={`${formStyle.h1Dashboard} mb-1`}>Reset Password</p>
     

      <label className={`${formStyle.label} font-bold `}>New Password</label>
      <div className='my-1'>
      <input 
      name={'password'} 
      className={formStyle.input}
      type={showPassword?"text":"password"}

       value={input.password} onChange={onInputChange}/>
      {showPassword?
        <AiOutlineEye 
        onClick={()=>setshowPassword(!showPassword)}
        color={COLORS.primary} 
        size={18} 
        className="cursor-pointer"
        style={{position:"absolute", marginTop:-48, marginLeft:315}}
        />:
        <AiOutlineEyeInvisible
         onClick={()=>setshowPassword(!showPassword)}
         color={COLORS.primary} 
         size={18} 
         className="cursor-pointer"
        style={{position:"absolute", marginTop:-48, marginLeft:315}}
        /> }
      </div>

      <label className={`${formStyle.label} font-bold `}>Confirm Password</label>
      <div className='mt-1'>
      <input 
      type={showConfirmPassword?"text":"password"}
      name={'confirmPassword'} 
      className={formStyle.input} 
      value={input.confirmPassword}
       onChange={onInputChange}/>

      {showConfirmPassword?
        <AiOutlineEye 
        onClick={()=>setshowConfirmPassword(!showConfirmPassword)}
        color={COLORS.primary} 
        size={18} 
        className="cursor-pointer"
        style={{position:"absolute", marginTop:-48, marginLeft:315}}
        />:
        <AiOutlineEyeInvisible
         onClick={()=>setshowConfirmPassword(!showConfirmPassword)}
         color={COLORS.primary} 
         size={18} 
         className="cursor-pointer"
        style={{position:"absolute", marginTop:-48, marginLeft:315}}
        /> }
      </div>

   
      <button 
        onClick={()=>handleSubmit()}
        className={`rounded-md bg-secondary mt-3 hover:bg-primary duration-300
         ease-in-out w-[100%] h-[50px] flex items-center justify-center`}
        >
            <p  className="text-white font-semibold text-lg">Submit</p>
      </button>
    {from==='user' &&  <p className="text-center mt-3 text-gray-800"> Already have an account?{" "}
        <span 
        onClick={()=>setactiveTab('verificationCode')}
        className="font-semibold text-secondary duration-300 ease-in-out
         hover:text-primary cursor-pointer">Login</span> </p>}
        {/* <ToastContainer/> */}
    </div>
  )
}

export default ResetPassword