import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../component/dashboardLayout'
import { formStyle } from '../../style/adminStyle'
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import { toastComponent } from "../../utils/toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { COLORS } from "../../utils/color";
import { useNavigate } from 'react-router-dom'
import { BiImageAdd } from 'react-icons/bi';
import Dropdown from 'react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../store/features/users/userService'
import {RiSendPlaneFill} from 'react-icons/ri'


import moment from 'moment';
import { updateInquiryById , getInquiryById} from '../../store/features/inquiry/inquiryService';


const InquiryForm = ({ toggleForm, data }) => {
    const dispatch = useDispatch()
    const list = useSelector(state => state?.user?.staffList)
    const [info, setinfo] = useState({})
    const user = useSelector(state => state.auth.user)

    const navigation = useNavigate();
    const [input, setinput] = useState({});
    const [showPassword, setshowPassword] = useState(false)
    const [staffList, setstaffList] = useState([])
    const [messageInput, setmessageInput] = useState("")

    const style={
        sender:`bg-primary/50`,
        receiver:`bg-secondary/80 text-white`,

    }

    useEffect(() => {
        if (staffList.length <= 0) {
            getAllStaffHandler()
        }
    }, [ staffList.length])

    

    useEffect(() => {
      
            if(Object.keys(info).length<1 && data._id){
              handleGetInquiryDetails()
            }
   
    }, [data._id,Object.keys(info).length, staffList.length])


    const handleGetInquiryDetails=()=>{
        dispatch(getInquiryById(data._id,res=>{
        if(res?.data){
            setinfo(res.data)
             
        if (!Object.keys(input).length) {
            let obj = {}
            if (res.data.assignHistory && res.data.assignHistory.length > 0) {
                let findAssignee = staffList.filter(item => item.value === res.data.assignHistory[0].assignee._id)
                if (findAssignee && findAssignee.length>0) {
                    obj.assignee = findAssignee[0].value
                }
            }
            obj.status = res.data.status
            obj.messages = res.data.message
            setinput(obj)
        }
        }
    } ))
    }
    
    useEffect(() => {
        if (staffList.length <= 0) {
            getAllStaffHandler()
        }
        if (!input.assignee && info.assignHistory && info.assignHistory.length>0) {
                 
                let findAssignee = staffList.filter(item => item.value === info.assignHistory[0].assignee._id)

                if (findAssignee && findAssignee[0]) {
                    setinput({...input, assignee:findAssignee[0].value})
                }
           
        }
    }, [ input.assignee, staffList.length, info.assignHistory&& info.assignHistory.length])

    const getAllStaffHandler = () => {
        dispatch(getUserList({ role: 'sales' }, record => {
            let temp = []
            for (const iterator of record.data) {
                temp.push({
                    label: iterator.firstName + " " + iterator.lastName,
                    value: iterator._id
                })
            }

            setstaffList(temp)
        }))
    }


    console.log(staffList)

    const onInputChange = (e) => {
        setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const updateStatus=(val)=>{
        console.log(val, info, data)
        dispatch(updateInquiryById(data._id,{status:val.value}, ()=>{
            dispatch(getInquiryById(data._id,res=>{
                if(res.data){
                    setinfo(res)
                    toast.success('Inquiry status updated successfully')
                }
            } ))
        }))

    }
    const updateMessage=()=>{
        if(messageInput){
            let obj= {
                type : user.role.role==="user"?"customer":"staff",
                message:messageInput ,
               sentAt: new Date()
            }
            let temp = input.messages.slice(0)
            
            temp.push(obj)
            console.log(info._id, obj)
            dispatch(updateInquiryById(info._id,obj, ()=>{
                
                toast.success('your message has sent successfully')
                setinput({...input, messages : temp})
                setmessageInput("")
               
            }))

        }
    }

    const updateAssignee=(value)=>{
        console.log(user._id)
        dispatch(updateInquiryById(info._id,{
            assignee:value.value,
            assignedBy:user._id,
            assignedAt:new Date()
        }, ()=>{
            dispatch(getInquiryById(info._id,res=>{
                if(res.data){
                    setinfo(res.data)
                    toast.success('Inquiry status updated successfully')
                }
            } ))
        }))
    }

    const renderMessage = (item, type) => {
        return (
            <div className={`w-[50%] ${type==="receiver" && 'ml-[50%]'} text-sm rounded-r-md text-gray-700`}>
                 <p className={`text-xs text-center text-gray-400 mt-4 mb-2 `}>{moment(item.sentAt).format('YYYY-MM-DD HH:mm')}</p>
                <div  className={`${style[type]} p-2 rounded-md `}>
                    <p>{item.message}</p></div>
            </div>
        )
    }
    
    return (
        <div>
            <p
                onClick={() => toggleForm()}
                className={`${formStyle.h1Dashboard} cursor-pointer hover:underline hover:text-primary text-sm px-2`}>Back</p>

            <p className={`${formStyle.h1Dashboard} px-2`}>Inquiry Details </p>

            <div className="ml-3 flex space-x-12 mb-3">
                <div>
                    <p className='text-sm text-gray-600'>Customer Name <span className='pl-5 font-semibold'>{info.firstName} {info.lastName}</span> </p>
                </div>
                <div>
                    <p className='text-sm text-gray-600'>Inquiry Date <span className='pl-5 font-semibold'>{moment(info.createdAt).format('YYYY-MM-DD')}</span> </p>
                </div>
                <div>
                    <p className='text-sm text-gray-600'>Vin Number <span className='pl-5 font-semibold'>{info?.vehicleId?.vin}</span> </p>
                </div>
            </div>
            <div className="ml-3 flex space-x-32 ">

            </div>

            <div className='ml-3 mt-3 flex space-x-12'>
                    {user?.role?.role=== "user" ?
                    <p className='text-sm text-gray-600'>Status <span className='pl-5 font-semibold'>{info?.status}</span> </p>
                    :
                    <div className='flex items-center md:w-[35%]'>
                    <label className='text-sm text-gray-600 mr-10'>Update Status</label>
                    <Dropdown
                        options={['pending', 'active', 'completed', 'closed', 'cancelled']}

                        name={'status'}
                        style={{ border: 0 }}
                        onChange={val => {
                            console.log(val)
                            setinput({ ...input, status: val })
                            updateStatus(val)
                        }}
                        value={input.status}
                        placeholder="Select" />


                </div>
                    
                     }
           

                     {(user?.role?.role==="admin" || user?.role?.role==="manager")&&
                <div className='flex items-center md:w-[35%]'>
                    <label className='text-sm text-gray-600 mr-10'>Assgined To</label>
                    <Dropdown
                        options={staffList}
                        name={''}
                        style={{ border: 0 }}
                        onChange={val => {
                            console.log(val)
                            setinput({ ...input, assignee: val })
                            updateAssignee(val)
                        }}
                        value={input.assignee}
                        placeholder="Select" />
                </div>}

            </div>

            <p className={`${formStyle.h1Dashboard} mt-10 px-2 text-lg`}>Messages </p>

            <div className='bg-slate-100 h-[60vh] w-[70vw]  overflow-y-scroll p-10 rounded-md '>
                {!!input.messages && input.messages.map((item, index) => (
                    <div>
                        {
                            user.role.role === "user" && item.type === "customer" ? renderMessage(item, 'receiver') :
                                user.role.role !== "user" && item.type !== "customer" ? renderMessage(item, 'receiver') :
                                    renderMessage(item,'sender')
                        }

                    </div>
                ))}
            </div>
            <div className=' flex justify-between items-center border-2 rounded-md h-[40px] mt-5'>
                <input 
                className='h-[100%] w-[50vw]  px-5 focus:outline-none'
                value={messageInput} onChange={e=>setmessageInput(e.target.value)}/>
                <div 
                onClick={updateMessage}
                className='h-[100%] flex cursor-pointer items-center text-white text-sm justify-center px-2 rounded-md bg-gray-800'>
                    <RiSendPlaneFill size={20} className=" text-white "/>
                        <p className='ml-2'>Send</p>
                </div>
            </div>
        </div>
    )
}

export default InquiryForm