import React, { useState } from "react";
import { formStyle } from "../../style/adminStyle";
import {useDispatch} from 'react-redux'
import 'react-quill/dist/quill.snow.css';
import {toast, ToastContainer}  from 'react-toastify';
import { forgetPassword, login } from "../../store/features/auth/authService";
import {useNavigate} from 'react-router-dom'
import { toastComponent } from "../../utils/toast";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import {BsArrowLeft} from "react-icons/bs"



const Forgetpassword = ({setactiveTab,from, setemail, closeModal}) => {
  
  const dispatch= useDispatch()
  const navigation = useNavigate();
  const [input, setinput] = useState({});
  const [showPassword, setshowPassword] = useState(false)

  const onInputChange = (e) => {
    setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit=(e)=>{
    try {

      let emailRegex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
      if(!input.email) throw "Please enter email"
      if(!input.email.match(emailRegex)) throw "Invalid Email"
      
      dispatch(forgetPassword(input, (data)=>{
        if(data.code && data.code !== 200){
         return toastComponent.error(data.message)
        }else{
            if(data.message){
                toastComponent.success(data.message)
                setTimeout(() => {
                    setemail(input.email)
                  setactiveTab("forget verification code")
                }, 2000);
              }
       //  setactiveTab("reset password")
        }
      }))

    } catch (error) {
      toastComponent.error(error)
    }

  }

  return (
    <div className="p-5">
       {from==="user" &&  <div 
       onClick={()=>setactiveTab("login")}
       className="flex  text-gray-500 space-x-1 duration-300 ease-in-out cursor-pointer items-center mb-4 hover:text-secondary">
        <BsArrowLeft size={18}/>
      <p className={` text-sm font-normal`}>Back</p>

       </div>}

       <p className={`${formStyle.h1Dashboard} mb-1`}>Forget Password</p>
       <p className="text-xs text-gray-400 mb-2">Lost Your password? Don't worry submit your email to get reset password email</p>

      <label className={`${formStyle.label} font-bold`}>Email</label>

      <div className="mt-1 mb-1">
        <input
          name={"email"}
          className={formStyle.input}
          value={input.email}
          onChange={onInputChange}
        />
      </div>

      
      

      <button 
        onClick={()=>handleSubmit()}
        className={`rounded-md bg-secondary mt-4 hover:bg-primary duration-300
         ease-in-out w-[100%] h-[50px] flex items-center justify-center`}
        >
            <p className="text-white font-semibold text-lg">Submit</p>
      </button>

    {from==="user" &&  <p className="text-center mt-3 text-gray-800"> Don't have an account?{" "}
        <span 
        onClick={()=>setactiveTab('signup')}
        className="font-semibold text-secondary duration-300 ease-in-out
         hover:text-primary cursor-pointer">Signup</span> </p>}

      
         {/* <ToastContainer/> */}
    </div>
  );
};

export default Forgetpassword;
