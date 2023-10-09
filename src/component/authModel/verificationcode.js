import React, { useState } from "react";
import { formStyle } from "../../style/adminStyle";
import {useDispatch} from 'react-redux'
import 'react-quill/dist/quill.snow.css';
import { ToastContainer}  from 'react-toastify';
// import {  ConfirmVerificationCode, forgetPassword, resetPassword, sendVerificationCode } from "../../store/action";
import {useNavigate} from 'react-router-dom'
import { toastComponent } from "../../utils/toast";
import OtpInput from 'react-otp-input';
import {BsArrowLeft} from "react-icons/bs"
import { COLORS } from "../../utils/color";
import { verifyAccount ,sendVerificationCode, forgetPassword } from "../../store/features/auth/authService";


const Verificationcode = ({setactiveTab,email,setcode, type, closeModal}) => {
  
  const dispatch= useDispatch()
  const [input, setinput] = useState({});

  const resendCode=()=>{
    if(type==="account verifification"){
        dispatch(sendVerificationCode({email},(data)=>{
            if(data.code && data.code !== 200){
                return toastComponent.error(data.message)
               }else{
                if(data.message){
                    return toastComponent.info(data.message)
                }
                setTimeout(() => {
                  setactiveTab("login")
                }, 2000); 
               }
        }))
    }else{
        dispatch(forgetPassword({email},(data)=>{
            if(data.code && data.code !== 200){
                return toastComponent.error(data.message)
               }else{
                if(data.message){
                    return toastComponent.info(data.message)
                }
                setTimeout(() => {
                  setactiveTab("reset password")
                }, 2000);
               }
        }))
    }
  
  }

  const handleSubmit=(e)=>{
    try {

    
      if(!input.code) throw "Please enter verification code"
      if(input.code.length<6) throw "Verification code should be atleast 6 characters long"

      let obj={
        code:String(input.code),
        email:email
      }
      

        dispatch(verifyAccount(obj, (data)=>{
            if(data.code && data.code !== 200){
             return toastComponent.error(data.message)
            }else{
                if(type==="account verification"){
                  //  toastComponent.success(data.message)
                   setTimeout(() => {
                             setactiveTab("login")
                   }, 2000);
                }else{
                  setTimeout(() => {
                    setactiveTab("reset password")  
                    setcode(obj.code)
                  }, 2000);
                }
            }
          })) 
      
      

    } catch (error) {
      toastComponent.error(error)
    }

  }

  return (
    <div className="p-5">
      {/* <label className={`${formStyle.label} font-bold`}>Verification Code</label> */}
       <div 
       onClick={()=>setactiveTab("signup")}
       className="flex  text-gray-500 space-x-1 duration-300 ease-in-out cursor-pointer items-center mb-4 hover:text-secondary">
        <BsArrowLeft size={18}/>
      <p className={` text-sm font-normal`}>Back</p>

       </div>

       <p className={`${formStyle.h1Dashboard} capitalize `}>Verification Code</p>

      <div className="mt-1 mb-1">
        <OtpInput
        value={input.code}
        onChange={val=>setinput({...input, code:val})}
        numInputs={6}
        isInputNum={true}
        containerStyle={{width:"100%", display:"flex",alignItems:"center", justifyContent:"center"}}
        inputStyle={{border:"1px solid #ccc", borderRadius:10, color:"gray",  width:50, height:60, margin:5}}
        focusStyle={{border:`3px solid ${COLORS.primary}`,  outline:"none"}}    
      />
      </div>


      <button 
        onClick={()=>handleSubmit()}
        className={`rounded-md bg-secondary hover:bg-primary duration-300
         ease-in-out w-[100%] h-[50px] flex mt-5 items-center justify-center`}
        >
            <p className="text-white font-semibold text-lg">Submit</p>
      </button>

      <p className="text-center mt-3 text-gray-800"> Click here to resend code {" "}
        <span 
        onClick={()=>resendCode()}
        className="font-semibold text-secondary duration-300 ease-in-out
         hover:text-primary cursor-pointer">Resend</span> </p>

      
         {/* <ToastContainer/> */}
    </div>
  );
};

export default Verificationcode;
