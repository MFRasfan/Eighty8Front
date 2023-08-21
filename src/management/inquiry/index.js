import React, {useState, useEffect} from 'react'
import DashboardLayout from '../../component/dashboardLayout'
import  {useDispatch, useSelector} from 'react-redux' 
// import { getAllRoles } from '../../store/actions/rolesAndPermissions'
import TableSimpleUI from '../../component/tables/TableSimpleUI'
import { formStyle } from '../../style/adminStyle'
// import CustomerForm from './customerForm'
import { getInquiryList, updateInquiryById } from '../../store/features/inquiry/inquiryService'
import {RiRefreshLine} from 'react-icons/ri'
import moment from 'moment'
import Switch from "react-switch";
import InquiryForm from './inquiryForm'
import { imageURL } from '../../store/api'

const Customer = () => {
  const dispatch = useDispatch()
  const [activePage, setactivePage] = useState("role-list")
  const [selectedRole, setselectedRole] = useState({})
  const user= useSelector(state=>state.auth.user)


  const [addNewModal, setaddNewModal] = useState(false)
  const [selectedItem, setselectedItem] = useState({})

  const list= useSelector(state=>state.inquiry.inquiryList)
  const isLoading= useSelector(state=>state.inquiry.isLoading)
  const [inquiryList, setInquiryList] = useState({
    data:[],
    page: 1,
    pages: 1,
    limit: 50,
    total: 0
  })
  
  const handleStatusUpdate=(item,index)=>{
    dispatch(updateInquiryById(item._id,{
        status: item.status==="active"?"inactive":"active"
      },()=>{
        getAllListHandler()
      }))
  }

  const getAllListHandler=()=>{
    dispatch(getInquiryList({page:1, limit:50},data=>setInquiryList(data)))
  
  }

useEffect(() => {
  if(!inquiryList.length){
    getAllListHandler()
  }
  if(inquiryList?.data.length !== list?.data.length && list.data.length>0){
    setInquiryList(list.data)
  }
}, [list.length])


const renderTableBody=(item,index)=>{
  return(
    <>
    <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
    {index+1}
    </td>
  { <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
    { (user?.role?.role!=="user")?
         <p>{item.firstName} {item.lastName}</p>:
        <img src={imageURL+item.vehicleId.images[0] } className="w-20 h-10 rounded-md"/>
    }
    
    </td>}
    <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
    {item?.vehicleId?.vin} 
    </td>
    <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
    {moment(item.createdAt).format("YYYY-MM-DD")} 
    </td>
    <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
    {item.status} 
    </td>
   
    {(user?.role?.role==="admin" || user?.role?.role==="manager")&&
    <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
    {item.assignHistory&& item.assignHistory.length>0? item.assignHistory[item.assignHistory.length-1].assignee.firstName+" "+  item.assignHistory[item.assignHistory.length-1].assignee.lastName:'Not assign yet' } 
    </td>}
    <td className="px-4 py-4 text-sm  items-center flex space-x-4 capitalize text-gray-800 whitespace-nowrap">
    <button 
    onClick={()=>setselectedItem(item) }
    className='border-[1px] rounded-md mt-2 self-center border-gray-700 px-4 hover:shadow-md text-gray-700 py-1'>Edit</button>
    </td>
    </>
  )
}


const defaultView=()=>{
  return(
    <>
     <p className={`${formStyle.h1Dashboard} px-2`}>Inquiry Management</p>
    
    
     <div className='flex mt-4 items-center justify-between'>
    <p  className={`${formStyle.h1Dashboard} capitalize text-lg px-2 pt-4`}>All Inquiries</p>
      
      <div>

      <div className='flex space-x-4 text-xs text-white'>
      <div
        onClick={()=>getAllListHandler()}
        className='bg-secondary w-28  h-[35px] flex space-x-3  rounded-md items-center justify-center
         cursor-pointer hover:bg-primary duration-300 ease-in-out'>
         <RiRefreshLine size={15}/>
         <p> Refresh</p>
        </div>
       
      </div>
      </div>
    </div>
    <TableSimpleUI 
    thead={(user?.role?.role==="admin" || user?.role?.role==="manager")?
    ['SR.No','Customer','Vehicle Modal','Inquiry Date','Inquiry Status','Assignee','view details']:
    ['SR.No','Vehicle Image','Vehicle Modal','Inquiry Date','Inquiry Status','view details'] }
    data={inquiryList.data}
    tdcells={renderTableBody}
   
    />
    </>
  )
}

  return (
   <DashboardLayout>
 {   Object.keys(selectedItem).length>0? 
 <InquiryForm toggleForm={()=>setselectedItem({})} data={selectedItem}/>
 : defaultView()}
    {/* {addNewModal?<CustomerForm toggleForm={()=>setaddNewModal(!addNewModal)}/>:defaultView()} */}

   
   </DashboardLayout>
  )


}

export default Customer