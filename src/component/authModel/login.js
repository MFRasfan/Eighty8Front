import React, { useState } from "react";
import { formStyle } from "../../style/adminStyle";
import {useDispatch} from 'react-redux'
import 'react-quill/dist/quill.snow.css';
import {toast, ToastContainer}  from 'react-toastify';
// import { login } from "../../store/action";
import {useNavigate} from 'react-router-dom'
import { toastComponent } from "../../utils/toast";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import { COLORS } from "../../utils/color";
import {  login } from "../../store/features/auth/authService";


// import Logo from '../../assets/logo.png'
// const formStyle={}
const Login = ({setactiveTab, closeModal}) => {
  
  const dispatch= useDispatch()
  const navigation = useNavigate();
  const [input, setinput] = useState({});
  const [showPassword, setshowPassword] = useState(false)

  const onInputChange = (e) => {
    setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin=(e)=>{
    try {

      let emailRegex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
      if(!input.email) throw "Please enter email"
      if(!input.email.match(emailRegex)) throw "Invalid Email"
      if(!input.password) throw "Please enter password"
      if(input.password.length <8) throw "Password should be atleast 8 character long"
      dispatch(login(input, data=>{
        if(data &&data.role){
          const {role}= data.role
          
          if(role==="user"){
           
            setTimeout(() => {
              navigation(`/profile`)
            }, 2000);
          }else{
          setTimeout(() => {
            let temp = role ==="admin"?"management":role
            navigation(`/${temp}`)
          }, 2000);
          }
         console.log(data)
        }
      }))

    } catch (error) {
      toastComponent.error(error)
    }

  }

  return (
    <>
 
    <div className="p-5">
      <label className={`${formStyle.label} font-bold`}>Email</label>

      <div className="mt-1 mb-1">
        <input
          name={"email"}
          className={formStyle.input}
          value={input.email}
          onChange={onInputChange}
        />
      </div>

      <label className={`${formStyle.label} font-bold `}>Password</label>
      <div className="w-[340px]" >
        <input
          name={"password"}
          className={formStyle.input}
          value={input.password}
          type={showPassword?"text":"password"}
          onChange={onInputChange}
        />
       <div>
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

      </div>
      <div>
        <p
          onClick={()=>setactiveTab('forgetPassword')}
          className="text-secondary hover:text-primary duration-300 
        ease-in-out text-center my-4 font-semibold cursor-pointer" 
        >
          Forget Password
        </p>
      </div>

      <button 
        onClick={()=>handleLogin()}
        className={`rounded-md bg-secondary hover:bg-primary hover:shadow-lg  duration-300
         ease-in-out w-[100%] h-[40px] flex items-center justify-center`}
        >
            <p className="text-white font-semibold text-lg">Login</p>
      </button>

      <p className="text-center mt-3 text-gray-800"> Don't have an account?{" "}
        <span 
        onClick={()=>setactiveTab('signup')}
        className="font-semibold text-secondary duration-300 ease-in-out
         hover:text-primary cursor-pointer">Signup</span> </p>

      
    </div>
         {/* <ToastContainer/> */}
    </>
  );
};

export default Login;
