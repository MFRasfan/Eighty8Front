import React, {useState} from 'react'
import { formStyle } from '../../style/adminStyle'
import {useDispatch} from 'react-redux'
import 'react-quill/dist/quill.snow.css';
import {toast, ToastContainer}  from 'react-toastify';
// import { signup } from "../../store/action";
import {useNavigate} from 'react-router-dom'
import { toastComponent } from "../../utils/toast";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import { COLORS } from '../../utils/color';
import { signup } from '../../store/features/auth/authService';

// const formStyle={}
const Signup = ({setactiveTab, setemail}) => {
    const [input, setinput] = useState({})
    const dispatch= useDispatch()
    const navigation = useNavigate();
    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)
    
    
    const onInputChange=(e)=>{  
        setinput(prev=>({...prev,[e.target.name]:e.target.value}))
      }
      const handleSignup=e=>{
        try {

          let emailRegex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
          if(!input.email) throw "Please enter email"
          if(!input.email.match(emailRegex)) throw "Invalid Email"
          if(!input.password) throw "Please enter password"
          if(input.password.length <8) throw "Password should be atleast 8 character long"
          if(!input.confirmPassword) throw "Please re-enter password"
          if(input.confirmPassword.length <8) throw "Confirm Password should be atleast 8 character long"
          if(input.password !== input.confirmPassword) throw "Password should be same"
        
          let obj={
            email:input.email, 
            password: input.password,
            role:'user'
          }
          dispatch(signup(obj, (data)=>{
                    if(data.message){
                      console.log(data.message)
                        toastComponent.info(data.message)
                        setTimeout(() => {
                              setactiveTab('verificationCode')
                              setemail(input.email)
                          }, 2000);
                        } 
                   }
              )
        )
    
    
        } catch (error) {
          toastComponent.error(error)
        }
      }
  return (
    <div className='p-5'>
         <label className={`${formStyle.label} font-bold`}>Email</label>
      <div className='my-1'>
      <input name={'email'} className={formStyle.input} value={input.email} onChange={onInputChange}/>
      </div>

      <label className={`${formStyle.label} font-bold `}>Password</label>
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
        onClick={()=>handleSignup()}
        className={`rounded-md bg-secondary mt-3 hover:bg-primary duration-300
         ease-in-out w-[100%] h-[50px] flex items-center justify-center`}
        >
            <p  className="text-white font-semibold text-lg">Signup</p>
      </button>
      <p className="text-center mt-3 text-gray-800"> Already have an account?{" "}
        <span 
        onClick={()=>setactiveTab('verificationCode')}
        className="font-semibold text-secondary duration-300 ease-in-out
         hover:text-primary cursor-pointer">Login</span> </p>
        {/* <ToastContainer/> */}
    </div>
  )
}

export default Signup