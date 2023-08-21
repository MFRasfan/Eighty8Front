import React, {useState, useEffect} from 'react'
import DashboardLayout from '../../component/dashboardLayout'
import  {useDispatch, useSelector} from 'react-redux' 
// import { getAllRoles } from '../../store/actions/rolesAndPermissions'
import TableSimpleUI from '../../component/tables/TableSimpleUI'
import { formStyle } from '../../style/adminStyle'
import StaffForm from './staffForm'
import { getUserList, updateUserById } from '../../store/features/users/userService'
import { setStaffList } from '../../store/features/users/userSlice'
import userAvatar from '../../assets/userAvatar.png' 
import { imageURL } from '../../store/api'
import {RiRefreshLine} from 'react-icons/ri'

import Switch from "react-switch";




const Staff = () => {
  const dispatch = useDispatch()
  const [addNewModal, setaddNewModal] = useState(false)
  const [activePage, setactivePage] = useState("role-list")
  const [selectedItem, setselectedItem] = useState({})

const [roleState, setroleState] = useState('')
const list= useSelector(state=>state.user.staffList)
const isLoading= useSelector(state=>state.user.isLoading)
const [staffList, setstaffList] = useState({
  data:[],
  page: 1,
  pages: 1,
  limit: 50,
  total: 0
})
 

useEffect(() => {
  if(!staffList.length){
    getAllStaffHandler()
  }
  if(staffList.data.length !== list.data.length && list.data.length>0){
    setstaffList(list.data)
  }
}, [list.length])

const getAllStaffHandler=()=>{
  dispatch(getUserList({role:'team',page:1, limit:50},data=>setstaffList(data)))

}
const handleStatusUpdate=(item,index)=>{
  dispatch(updateUserById(item._id,{
      status: item.status==="active"?"inactive":"active"
    },()=>{
    dispatch(getUserList({role:'team',page:1, limit:50},data=>setstaffList(data)))
    }))
}
const renderTableBody=(item,index)=>{
  return(
    <>
    <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
    {index+1}
    </td>
    <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
        <img src={item.image?imageURL+item.image:userAvatar} className="w-12 h-12"/>
    </td>
    <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
    {item.firstName} {item.lastName}
    </td>
    <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
    {item?.role?.role}
    </td>
    <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
    {item.email}
    </td>
   
    <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
    {item.status}
    </td>
    <td className="px-4 py-4 text-sm  items-center flex space-x-4 capitalize text-gray-800 whitespace-nowrap">
    <Switch onChange={()=>handleStatusUpdate(item,index)} checked={item.status==="active"} />

    <button 
    onClick={()=>setselectedItem(item) }
    className='border-[1px] rounded-md border-gray-700 px-4 hover:shadow-md text-gray-700 py-1'>Edit</button>
    </td>
    </>
  )
}


const defaultView=()=>{
  return(
    <>
     <p className={`${formStyle.h1Dashboard} px-2`}>Team Management</p>
    
    
    {/* <div className='flex mt-4 items-center justify-between'>
    <p  className={`${formStyle.h1Dashboard} capitalize text-lg px-2 pt-4`}>All Team</p>
      
      <div>

      <div className='flex space-x-4 text-xs text-white'>
        <div
        onClick={()=>setaddNewModal(true)}
        className='bg-secondary p-2 rounded-md
         cursor-pointer hover:bg-primary duration-300 ease-in-out'>Add New Member</div>
    
      
      </div>
      </div>
    </div> */}
    <div className='flex mt-4 items-center justify-between'>
    <p  className={`${formStyle.h1Dashboard} capitalize text-lg px-2 pt-4`}>All Team Members</p>
      
      <div>

      <div className='flex space-x-4 text-xs text-white'>
      <div
        onClick={()=>getAllStaffHandler()}
        className='bg-secondary w-28  h-[35px] flex space-x-3  rounded-md items-center justify-center
         cursor-pointer hover:bg-primary duration-300 ease-in-out'>
         <RiRefreshLine size={15}/>
         <p> Refresh</p>
        </div>
        <div
        onClick={()=>setaddNewModal(true)}
        className='bg-secondary  px-4 h-[35px] flex space-x-3  rounded-md items-center justify-center
         cursor-pointer hover:bg-primary duration-300 ease-in-out'>Add New Member</div>
      </div>
      </div>
    </div>
    <TableSimpleUI 
    thead={['SR.No','Image','Username','Role','Email','Status','Action']}
    data={staffList.data}
    tdcells={renderTableBody}
  
    />
    </>
  )
}

  return (
   <DashboardLayout>
    {addNewModal?<StaffForm toggleForm={()=>setaddNewModal(!addNewModal)}/>:
   
      Object.keys(selectedItem).length>0? 
      <StaffForm toggleForm={()=>setselectedItem({})} mode="edit" data={selectedItem}/>
        :defaultView()

     }
   
   </DashboardLayout>
  )


}

export default Staff