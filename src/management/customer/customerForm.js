import React,{useState, useEffect} from 'react'
import DashboardLayout from '../../component/dashboardLayout'
import { formStyle } from '../../style/adminStyle'
import 'react-quill/dist/quill.snow.css';
import {toast, ToastContainer}  from 'react-toastify';
import { toastComponent } from "../../utils/toast";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import { COLORS } from "../../utils/color";
import {useNavigate} from 'react-router-dom'
import { BiImageAdd } from 'react-icons/bi';


const StaffForm = ({toggleForm}) => {
  const navigation = useNavigate();
  const [input, setinput] = useState({});
  const [showPassword, setshowPassword] = useState(false)

  const onInputChange = (e) => {
    setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit=()=>{}

  return (
   <div>
        <p 
        onClick={()=>toggleForm()}
        className={`${formStyle.h1Dashboard} cursor-pointer hover:underline hover:text-primary text-sm px-2`}>Back</p>
        
        <p className={`${formStyle.h1Dashboard} px-2`}>Create New Staff</p>
     

        <div className='flex md:flex-row flex-col space-x-6'>
          <div>
            <div className='bg-slate-100 h-[100%] w-[20vw] rounded-lg flex items-center cursor-pointer hover:shadow-md justify-center'>
              <BiImageAdd size={125}/>
            </div>
          </div>
          <div className="p-2 md:w-[40vw]">
          <div className='flex flex-col space-x-4 md:flex-row'>
            <div className='md:w-[50%]'>
              <label className={`${formStyle.label} font-bold`}>Username</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"username"}
                    className={formStyle.input}
                    value={input.username}
                    onChange={onInputChange}
                  />
                </div>
            </div>

            <div className='md:w-[50%]'>
              <label className={`${formStyle.label} font-bold`}>Role</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"role"}
                    className={formStyle.input}
                    value={input.role}
                    onChange={onInputChange}
                  />
                </div>
            </div>




          </div>

          <div className='flex flex-col space-x-4 md:flex-row'>
            <div className='md:w-[50%]'>
              <label className={`${formStyle.label} font-bold`}>Email</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"username"}
                    className={formStyle.input}
                    value={input.username}
                    onChange={onInputChange}
                  />
                </div>
            </div>

            <div className='md:w-[50%]'>
              <label className={`${formStyle.label} font-bold`}>Phone</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"role"}
                    className={formStyle.input}
                    value={input.role}
                    onChange={onInputChange}
                  />
                </div>
            </div>
          </div>

          <div className='flex flex-col space-x-4 md:flex-row'>
            <div className='md:w-[50%]'>
              <label className={`${formStyle.label} font-bold`}>Password</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"username"}
                    className={formStyle.input}
                    value={input.username}
                    onChange={onInputChange}
                  />
                </div>
            </div>

            <div className='md:w-[50%]'>
              <label className={`${formStyle.label} font-bold`}>Confirm Password</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"role"}
                    className={formStyle.input}
                    value={input.role}
                    onChange={onInputChange}
                  />
                </div>
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
        </div>
     

   </div>
  )
}

export default StaffForm