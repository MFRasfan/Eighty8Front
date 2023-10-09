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
import { useDispatch, useSelector } from 'react-redux';
import {uploadMedia} from "../../store/features/media/mediaService"
import { updateUserById } from '../../store/features/users/userService';
import { imageURL } from '../../store/api';
import { getMyProfileData } from '../../store/features/auth/authService';


const Profile = () => {
  const [input, setinput] = useState({});
  const dispatch= useDispatch()
  const [ImagePreview, setImagePreview] = useState("")
  const [imageFile, setimageFile] = useState({})
  const user= useSelector(state=>state.auth.user)


  const onInputChange = (e) => {
    setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
  if(!Object.keys(input).length){
    setinput(user)
  }

  }, [user])
  
  const handleSubmit=()=>{
    let obj={}
        if(input.firstName){
          obj.firstName=input.firstName
        }
        if(input.lastName){
          obj.lastName=input.lastName
        }
        if(input.phone){
          obj.phone=input.phone
        }
       
 
        if(ImagePreview){
          const formData= new FormData()
          formData.append('file',imageFile)
          dispatch (uploadMedia(formData,( response) => {
            if(response.data && response.data.url){
                obj.image= response.data.url
                dispatch(updateUserById(user._id, obj,()=>{
                 dispatch(getMyProfileData(user._id, data=>setinput(data)))
                }))
            }}))    
        }else{

          dispatch(updateUserById(user._id, obj,()=>{
            dispatch(getMyProfileData(user._id, data=>setinput(data)))
          }))
        }
  
  
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setimageFile(file)
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreview(fileReader.result)
    };
    fileReader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    document.getElementById("image-input").click();
  };
  
  return (
   <DashboardLayout>
        <p className={`${formStyle.h1Dashboard} px-2`}>Profile</p>
     
        <p className={`${formStyle.h1Dashboard} text-lg px-2`}>Personal Information</p>

        <div className='flex md:flex-row flex-col space-x-6'>
          <div>
          <div 
            onClick={handleButtonClick}
            className='bg-slate-100 h-[60vh] w-[20vw] rounded-lg overflow-hidden flex items-center cursor-pointer hover:shadow-md justify-center'>
             {user.image?
             <img src={imageURL+user.image} className="w-[100%] h-[100%] bg-cover"/>:

              ImagePreview?
             <img src={ImagePreview} className="w-[100%] h-[100%] bg-cover"/>
             : <BiImageAdd size={125}/>}
            </div>
          </div>

  
        
          <input id="image-input" type="file" style={{ display: "none" }} onChange={handleImageUpload}/>
          <div className="p-2 md:w-[40vw]">
          <div className='flex flex-col space-x-4 md:flex-row'>
            <div className='md:w-[100%]'>
          <div className="mt-1 mb-1">
          <label className={`${formStyle.label} font-bold`}>Role</label>

                  <input
                    name={"role"}
                    className={`${formStyle.input} bg-slate-100`}
                    value={input?.role?.role}
                    onChange={onInputChange}
                    disabled={true}
                  />

                </div>
            </div>
            </div>

          <div className='flex flex-col space-x-4 md:flex-row'>
            <div className='md:w-[50%]'>
              <label className={`${formStyle.label} font-bold`}>First Name</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"firstName"}
                    className={formStyle.input}
                    value={input.firstName}
                    onChange={onInputChange}
                  />
                </div>
            </div>

            <div className='md:w-[50%]'>
             
                <label className={`${formStyle.label} font-bold`}>Last Name</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"lastName"}
                    className={formStyle.input}
                    value={input.lastName}
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
                    name={"email"}
                    disabled={true}

                    className={`${formStyle.input} bg-slate-100`}
                    value={input.email}
                    onChange={onInputChange}
                  />
                </div>
            </div>

            <div className='md:w-[50%]'>
              <label className={`${formStyle.label} font-bold`}>Phone</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"phone"}
                    maxLength={13}
                    className={formStyle.input}
                    value={input.phone}
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
     

   </DashboardLayout>
  )
}

export default Profile