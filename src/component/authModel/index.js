import React, {useState, useEffect} from 'react'
import Forgetpassword from './forgetpassword'
import Login from './login'
import ResetPassword from './resetPassword'
import Signup from './signup'
import Verificationcode from './verificationcode'
import {AiOutlineClose} from 'react-icons/ai'
import { COLORS } from '../../utils/color'
import ModalComponent from '../ModalComponent'


const AuthModal = ({className, from='user', tabName, showModal, toggleModal}) => {
    const [activeTab, setactiveTab] = useState("login")
    const [email, setemail] = useState("")
    const [code, setcode] = useState("")

    useEffect(() => {
      if(tabName){
        setactiveTab(tabName)
      }
    }, [tabName])
    

  return (
    <ModalComponent 
    toggleModal={toggleModal}
     showModal={showModal}
     style={{background:'transparent'}}
   
     >
     <div className='bg-white mt-28 w-96 rounded-md shadow-md  overflow-hidden'>
                {(activeTab==="login"|| activeTab==="signup")&&  <div className='flex'>
                <div 
                onClick={()=>setactiveTab("login")}
                className={`
                h-[45px] w-[50%] flex items-center justify-center cursor-pointer 
                hover:opacity-80 duration-300 ease-in-out font-bold
                ${activeTab==="login"?'bg-primary text-white':
                'bg-gray-100 text-secondary  text-lg'}`}>Login</div>
              
                <div 
                onClick={()=>setactiveTab("signup")}
                 className={`
                h-[45px] w-[50%] flex items-center justify-center cursor-pointer
                 hover:opacity-80   duration-300 ease-in-out font-bold
                ${activeTab==="signup"?'bg-primary text-white'
                :'bg-gray-100 text-secondary text-lg'}`}>Signup</div>

            </div>}

        
                {activeTab==="login"?
                    <Login setactiveTab={val=>setactiveTab(val)} closeModal={toggleModal}/> :
                activeTab==="signup"?
                    <Signup setemail={setemail} setactiveTab={val=>setactiveTab(val)}/>:

                activeTab==="verificationCode"?
                <Verificationcode from={from} setcode={setcode}  email={email} type="account verification" setactiveTab={val=>setactiveTab(val)}/>:
                activeTab==="forget verification code"?
                <Verificationcode email={email} setcode={setcode} type="forget verification code" setactiveTab={val=>setactiveTab(val)}/>:
                activeTab==="reset password"?
                <ResetPassword from={from} code={code} email={email} setemail={setemail}   setactiveTab={val=>setactiveTab(val)}/>:
                <Forgetpassword from={from} setemail={setemail} setactiveTab={val=>setactiveTab(val)}/>
                
                }


        </div>

    </ModalComponent>

  )
}

export default AuthModal