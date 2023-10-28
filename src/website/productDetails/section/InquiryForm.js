import React,{useState, useEffect} from 'react'
import { formStyle } from '../../../style/adminStyle'
import {BsFillTelephoneFill} from 'react-icons/bs'
import{AiFillClockCircle} from 'react-icons/ai'
import{IoLocation} from 'react-icons/io5'
import {validateEmail} from '../../../utils/validation'
import { toast } from 'react-toastify'
import { createInquiry } from '../../../store/features/inquiry/inquiryService'
import { useDispatch, useSelector } from 'react-redux'
import { getContact} from '../../../store/features/webcontent/webContentService';
import {MdEmail} from 'react-icons/md'
import moment from 'moment'


const InquiryForm = ({vehicleid,id,reference}) => {


  const [input, setinput] = useState({})
  const user= useSelector(state=>state.auth.user)
  const dispatch = useDispatch()
  const [contactDetails, setcontactDetails] = useState({});
  const contact = useSelector((state) => state.webContent.contactDetails);

  useEffect(() => {

   if(user && user._id && user.role.role==="user"){
  
    setinput({
      firstName : user.firstName,
      lastName: user.lastName,
      email:user.email,
      phone:user.phone,
      customerId:user._id
    })
   }
  }, [user._id])

  useEffect(() => {
    if (contact.length === 0) {
      dispatch(getContact((data) =>{

        if(data[0] ){
          setcontactDetails(data[0]) 
          }
        
    }));
    }else{
      setcontactDetails(contact[0]);
    }
  }, [dispatch, contact]);
  
  const onInputChange = (e) => {
    setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };  

  const handleSubmitInquiry=()=>{
    try {
      const {firstName, lastName, email, message, phone}= input;
      if(user && user._id&& user.role.role !== "user"){
     
          toast.error("You are currently logged in as a team member of eightyeight alpha , please login through user account")
      }
      else{
        if(!firstName) throw "Please enter first name"
        if(!lastName) throw "Please enter last name" 
        if(!email) throw "Please enter email" 
        if(!validateEmail(email)) throw "Please enter valid email"
        if(!phone) throw "Please enter phone"
        if(!message) throw "Please enter message" 
        
        let obj = {...input};
        if(vehicleid){
          obj.vehicleId=vehicleid
        }

        dispatch(createInquiry(obj,()=>{
          setinput({
            firstName:"",
            lastName:"",
            email:"",
            phone:"",
            message:""
          })
        }))
      }
    
    } catch (error) {
      toast.error(error)
    }
    
  }

  
  return (
    <div id={id} ref={reference} className='bg-slate-50 px-5 pt-20 md:px-20 mt-20'>
      <p className='text-center font-bold text-4xl md:text-5xl text-gray-700'>Make it yours.</p>
      <div className='flex items-center justify-center md:px-52 text-center font-semibold text-lg md:text-2xl text-gray-500 py-5'>
      <p>Complete the paperwork online and we'll deliver to you as soon as the next day.</p>
      </div>

      <div className='flex md:flex-row flex-col md:w-[70vw] justify-between mt-10 px-2 md:px-5 '>
      <div>
          <p className='font-bold text-gray-700 ml-5 md:ml-0 text-xl  md:text-2xl mb-10'>Have questions about the vehicle?</p>

          <div className='px-5'>
          <div className='flex flex-col space-x-4 md:flex-row'>
            <div className='md:w-[100%]'>
              <label className={`${formStyle.label} font-semibold`}>First Name</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"firstName"}
                    className={`${formStyle.input} bg-slate-50 border-[1px] border-gray-700`}
                    value={input.firstName}
                    placeholder={'John'}
                    onChange={onInputChange}
                  />
                </div>
            </div>
          </div>
          <div className='flex flex-col space-x-4 md:flex-row'>
            <div className='md:w-[100%]'>
              <label className={`${formStyle.label} font-semibold`}>Last Name</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"lastName"}
                    className={`${formStyle.input} bg-slate-50 border-[1px] border-gray-700`}
                    value={input.lastName}
                    placeholder={'Smith'}
                    onChange={onInputChange}
                  />
                </div>
            </div>
          </div>
          <div className='flex flex-col space-x-4 md:flex-row'>
            <div className='md:w-[100%]'>
              <label className={`${formStyle.label} font-semibold`}>Email</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"email"}
                    type="email"
                    disabled={user.email}
                    className={`${formStyle.input} bg-slate-50 border-[1px] border-gray-700 ${!!user.email && "bg-slate-200"}`}
                    value={input.email}
                    placeholder={'smith@eightyeightalphaautos.com'}
                    onChange={onInputChange}
                  />
                </div>
            </div>
          </div>
          <div className='flex flex-col space-x-4 md:flex-row'>
            <div className='md:w-[100%]'>
              <label className={`${formStyle.label} font-semibold`}>Phone</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"phone"}
                    className={`${formStyle.input} bg-slate-50 border-[1px] border-gray-700`}
                    value={input.phone}
                    maxLength={13}
                    placeholder={'(555)555-5555'}
                    onChange={onInputChange}
                  />
                </div>
            </div>
          </div>
          <div className='flex flex-col space-x-4 md:flex-row'>
            <div className='md:w-[100%]'>
              <label className={`${formStyle.label} font-semibold`}>Message</label>
                <div className="mt-1 mb-1">
                  <div >
                  <textarea
                    name={"message"}
                    rows={6}
                    className={`${formStyle.input} h-48 pt-4 rounded-md bg-slate-50 border-[1px] border-gray-700`}
                    value={input.message}
                    placeholder={'Does this car comes with...'}
                    multiple={true}
                    onChange={onInputChange}
                  />
                  </div>
                </div>
            </div>
          </div>

          <button 

          onClick={()=>handleSubmitInquiry()}
          className='bg-gray-600 border-[1px]  mb-10 hover:bg-primary duration-300 hover:border-none  border-secondary/60 text-white w-40 rounded-md h-12'>
            <p className='font-bold tracking-wide'>Submit</p>
          </button>
          </div>
      </div>
      <div  className='flex flex-col  text-sm pl-5 pr-10  text-gray-800 space-y-10'>
        <div>
        <p className='font-bold text-black text-2xl  mb-10'>Reach out to us directly</p>
        <div className=' flex space-x-4  cursor-pointer text-gray-800 hover:text-primary duration-300'>
        <BsFillTelephoneFill size={18} className="mt-1"/>
          <p className=''>{contactDetails.phonePrimary}</p>
        </div>
        </div>
        <div>
        <div className=' flex space-x-4 -mt-9 cursor-pointer text-gray-800 hover:text-primary duration-300'>
        {/* <BsFillTelephoneFill size={18} className="mt-1"/> */}
          <div className='w-5'/>
          <p className=''>{contactDetails.phoneSecondary}</p>
        </div>
        </div>

        <div>
        
        <div className=' flex space-x-4  cursor-pointer text-gray-800 hover:text-primary duration-300'>
        <MdEmail size={18} className="mt-1"/>
          <p className=''>{contactDetails.emailPrimary}</p>
        </div>
        </div>
        <div>
        <div className=' flex space-x-4 -mt-9 cursor-pointer text-gray-800 hover:text-primary duration-300'>
        {/* <BsFillTeleemailFill size={18} className="mt-1"/> */}
          <div className='w-5'/>
          <p className=''>{contactDetails.emailSecondary}</p>
        </div>
        </div>
        <div className=' flex space-x-4  text-gray-800 '>
        <AiFillClockCircle size={18} className="mt-1"/>
        <p>Monday To Saturday: {contactDetails.weekdaysOpenTime?moment(contactDetails.weekdaysOpenTime, "HH:mm").format("hh:mm A") :"" } - {contactDetails.weekdaysCloseTime?moment(contactDetails.weekdaysCloseTime, "HH:mm").format("hh:mm A") :"" } <br/>
       {/* {!!contactDetails.weekendOpenTime&& <span>
          Weekend:{'   '}{contactDetails.weekendOpenTime?moment(contactDetails.weekendOpenTime, "HH:mm").format("hh:mm A") :"" } - {contactDetails.weekendCloseTime?moment(contactDetails.weekendCloseTime, "HH:mm").format("hh:mm A") :"" } 
        </span>} */}
        <span>Sunday: Closed</span>
          <br/>
        </p>
        </div>
       

        <div className='flex  space-x-4'>
          <div>
            <IoLocation size={19}/>
          </div>
         <div>
         <p className='font-bold mb-2'>Address</p>
          <p className='font-bold'>{contactDetails.addressTitlePrimary}</p>
          <p className='leading-5'>{contactDetails.addressDetailsPrimary}</p>
            <div className='mt-4'>
            <p className='font-bold'>{contactDetails.addressTitleSecondary}</p>
          <p className='leading-5'>{contactDetails.addressDetailsSecondary}</p>
        </div>
         </div>
        </div>
       
      </div>
      </div>
    </div>
  )
}

export default InquiryForm