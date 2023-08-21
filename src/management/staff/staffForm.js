import React,{useState, useEffect} from 'react'
import { formStyle } from '../../style/adminStyle'
import 'react-quill/dist/quill.snow.css';
import {toast, ToastContainer}  from 'react-toastify';
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import {useNavigate, useRevalidator} from 'react-router-dom'
import { BiImageAdd } from 'react-icons/bi';
import Dropdown from 'react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles } from '../../store/features/role/roleService';
import { validateEmail, validatePassword } from '../../utils/validation';
import {uploadMedia} from "../../store/features/media/mediaService"
import { createStaff, updateUserById } from '../../store/features/users/userService';
import { imageURL } from '../../store/api';


const StaffForm = ({toggleForm, mode, data}) => {
  const navigation = useNavigate();
  const [input, setinput] = useState({});
  const rolesSelector= useSelector(state=>state.role.roles)
  const [roles, setroles] = useState([])
  const dispatch= useDispatch()
  const [ImagePreview, setImagePreview] = useState("")
  const [imageFile, setimageFile] = useState({})
  const [showPassword, setshowPassword] = useState(false)
  const [showConfirmPassword, setshowConfirmPassword] = useState(false)


  const onInputChange = (e) => {
    setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if(!rolesSelector.length){
      dispatch(fetchRoles())
    }else{
      let temp=[]
      for (const iterator of rolesSelector) {
          if(iterator.status==="active"){
            temp.push({
              label:iterator.role,
               value:iterator._id
            })
          }
        }
        
      setroles(temp)
    }
    if(mode==="edit" ){
      setinput({
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        role:{
          label:data?.role?.role,
          value:data?.role?._id
        }
      })
    }
  },[rolesSelector.length])


  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setimageFile(file)
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreview(fileReader.result)
    };
    fileReader.readAsDataURL(file);
  };

const handleEditSubmit=()=>{
  let obj={}
      if(input.firstName){
        obj.firstName=input.firstName
      }
      if(input.lastName){
        obj.lastName=input.lastName
      }
      if(input?.role?.value){
        obj.role=input.role.value
      }
     
      if(input.password){
       
         if(validatePassword(input.password)){
          throw "Invalid password"
        }
        else if(!input.confirmPassword){
          throw "Please enter confirm Password"
        }
        else if(validatePassword(input.confirmPassword)){
          throw "Invalid confirm Password"
        }
        else if(input.password !== input.confirmPassword){
          throw "Both password should be same"
        }
        obj.password= input.password
      }
      else if(!input.role || !input.role.value){
        throw "Please select role"
      }

      if(ImagePreview){
        const formData= new FormData()
        formData.append('file',imageFile)
        dispatch (uploadMedia(formData,( response) => {
          console.log(response.data);
          if(response.data && response.data.url){
              obj.image= response.data.url
              console.log("OBJ------", obj)
              dispatch(updateUserById(data._id, obj,()=>{
                setinput({
                  firstName:"",
                  lastName:"",
                  email:"",
                  phone:"",
                  role:"",
                  confirmPassword:"",
                  password:""
        
                })
                setImagePreview("")
                setimageFile({})
                toggleForm()
              }))
          }}))    
      }else{
        console.log(obj, input)
        dispatch(updateUserById(data._id, obj,()=>{
          setinput({
            firstName:"",
            lastName:"",
            email:"",
            phone:"",
            role:"",
            confirmPassword:"",
            password:""
  
          })
          setImagePreview("")
          setimageFile({})
          toggleForm()
        }))
      }


}


  const handleSubmit=()=>{
    try {
      console.log(validateEmail(input.email))
      if(!input.firstName){
        throw "Please enter first name"
      }
      else if(!input.lastName){
        throw "Please enter last name"
      }
      else if(!input.email){
        throw "Please enter email"
      }
      else if(!validateEmail(input.email)){
        throw "Please enter valid email"
      }
      else if(!input.role){
        throw "Please select valid role"
      }
      else if(!input.password){
        throw "Please enter password"
      }
     else if (input.password.length < 8){
        throw "Password should be atleast 8 character long";
      }

      else if(!input.confirmPassword){
        throw "Please enter password"
      }
     else if (input.confirmPassword.length < 8){
        throw "Password should be atleast 8 character long";
      }

      // else if(validatePassword(input.password)){
      //   throw "Invalid password"
      // }
      // else if(!input.confirmPassword){
      //   throw "Please enter confirm Password"
      // }
      // else if(!validatePassword(input.confirmPassword)){
      //   throw "Invalid confirm Password"
      // }
      else if(input.password !== input.confirmPassword){
        throw "Both password should be same"
      }

    
      let {email, password, firstName,lastName}= input
      let obj={email, password, firstName,lastName}
      obj.role=input.role.value
      if(ImagePreview){
        const formData= new FormData()
        formData.append('file',imageFile)
        dispatch (uploadMedia(formData,( response) => {
          console.log(response.data);
          if(response.data && response.data.url){
              obj.image= response.data.url
              console.log("OBJ------", obj)
              dispatch(createStaff(obj,()=>{
                setinput({
                  firstName:"",
                  lastName:"",
                  email:"",
                  phone:"",
                  role:"",
                  confirmPassword:"",
                  password:""
        
                })
                setImagePreview("")
                setimageFile({})
              }))
          }}))    
      }else{
        dispatch(createStaff(obj,()=>{
          setinput({
            firstName:"",
            lastName:"",
            email:"",
            phone:"",
            role:"",
            confirmPassword:"",
            password:""
  
          })
          setImagePreview("")
          setimageFile({})
        }))
  
  
  
      }
     
    
    } catch (error) {
      toast.error(error)
    }
  }
  const handleButtonClick = () => {
    document.getElementById("image-input").click();
  };

  return (
   <div>
        <p 
        onClick={()=>toggleForm()}
        className={`${formStyle.h1Dashboard} cursor-pointer hover:underline hover:text-primary text-sm px-2`}>Back</p>
        
        <p className={`${formStyle.h1Dashboard} px-2`}> {mode==="edit"?'Edit Staff Details':'Create New Staff'}</p>
     

        <div className='flex md:flex-row flex-col space-x-6'>
          <div>
            <div 
            onClick={handleButtonClick}
            className='bg-slate-100 h-[60vh] w-[20vw] rounded-lg overflow-hidden flex items-center cursor-pointer hover:shadow-md justify-center'>
             {mode==="edit" &&data.image?
             <img src={imageURL+data.image} className="w-[100%] h-[100%] bg-cover"/>:

              ImagePreview?
             <img src={ImagePreview} className="w-[100%] h-[100%] bg-cover"/>
             : <BiImageAdd size={125}/>}
            </div>
          </div>
          <input
        id="image-input"
        type="file"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
          <div className="p-2 md:w-[40vw]">
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
                    disabled={mode==="edit"}
                    name={"email"}
                    className={`${formStyle.input} ${mode==="edit"&&'bg-slate-100'}`}
                    value={input.email}
                    onChange={onInputChange}
                  />
                </div>
            </div>

            <div className='md:w-[50%]'>
              <label className={`${formStyle.label} font-bold`}>Role</label>
                <div className="mt-1 mb-1">
                  {/* <input
                    name={"role"}
                    className={formStyle.input}
                    value={input.role}
                    onChange={onInputChange}
                  /> */}
                  <Dropdown 
        options={roles} 

        name={'role'}
        style={{border:0}}
        onChange={val=>{
          console.log(val)
          setinput({...input,role:val})}} 
        value={input.role} 
        placeholder="Select" />
                </div>
            </div>
          </div>

          <div className='flex flex-col space-x-4 md:flex-row'>
            <div className='md:w-[50%]'>
              <label className={`${formStyle.label} font-bold`}>Password</label>
              <div className="mt-1 flex mb-1">
                <input
                    name={'password'}
                    className={formStyle.input}
                    value={input.password}
                    type={showPassword?"text":"password"}
                    onChange={onInputChange}
                  />
                 {showPassword? <AiOutlineEye
                  onClick={()=>setshowPassword(!showPassword)}
                   size={20} color={'black'} className="-ml-8 mt-4"/>
                   : <AiOutlineEyeInvisible
                  onClick={()=>setshowPassword(!showPassword)}
                   size={20} color={'black'} className="-ml-8 mt-4"/>}
                </div>
            </div>

            <div className='md:w-[50%]'>
              <label className={`${formStyle.label} font-bold`}>Confirm Password</label>
                <div className="mt-1 flex mb-1">
                  <input
                    name={'confirmPassword'}
                    className={formStyle.input}
                    value={input.confirmPassword}
                    type={showConfirmPassword?"text":"password"}
                    onChange={onInputChange}
                  />
                 {showConfirmPassword? <AiOutlineEye
                  onClick={()=>setshowConfirmPassword(!showConfirmPassword)}
                   size={20} color={'black'} className="-ml-8 mt-4"/>
                   : <AiOutlineEyeInvisible
                  onClick={()=>setshowConfirmPassword(!showConfirmPassword)}
                   size={20} color={'black'} className="-ml-8 mt-4"/>}
                   
                </div>
            </div>
          </div>

      <button 
        onClick={()=>mode==="edit"? handleEditSubmit() :handleSubmit()}
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