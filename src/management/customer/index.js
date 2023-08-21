import React, {useState, useEffect} from 'react'
import DashboardLayout from '../../component/dashboardLayout'
import  {useDispatch, useSelector} from 'react-redux' 
import TableSimpleUI from '../../component/tables/TableSimpleUI'
import { formStyle } from '../../style/adminStyle'
import CustomerForm from './customerForm'
import { getUserList, updateUserById } from '../../store/features/users/userService'
import userAvatar from '../../assets/userAvatar.png' 
import { imageURL } from '../../store/api'
import {RiRefreshLine} from 'react-icons/ri'

import Switch from "react-switch";




const Customer = () => {
  const dispatch = useDispatch()
  const [addNewModal, setaddNewModal] = useState(false)
  const [selectedItem, setselectedItem] = useState({})

const list= useSelector(state=>state.user.userList)
const isLoading= useSelector(state=>state.user.isLoading)
const [userList, setuserList] = useState({
  data:[],
  page: 1,
  pages: 1,
  limit: 50,
  total: 0
})
 


useEffect(() => {
  if (!userList.data || !userList.data.length) {
    getAlluserHandler()
  }
  if (userList.data.length !== list.length && list.length > 0) {
    setuserList(list.data);
  }
}, [userList.data && userList.data.length , list.length]);

const getAlluserHandler=()=>{
  dispatch(getUserList({role:'user',page:1, limit:50},data=>setuserList(data)))

}
const handleStatusUpdate=(item,index)=>{
  dispatch(updateUserById(item._id,{
      status: item.status==="active"?"inactive":"active"
    },()=>{
    dispatch(getUserList({role:'user',page:1, limit:50},data=>setuserList(data)))
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
    {item.email}
    </td>
    <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
    {item.phone}
    </td>
   
    <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
    {item.status}
    </td>
    <td className="px-4 py-4 text-sm  items-center flex space-x-4 capitalize text-gray-800 whitespace-nowrap">
    <Switch onChange={()=>handleStatusUpdate(item,index)} checked={item.status==="active"} />

    {/* <button 
    onClick={()=>setselectedItem(item) }
    className='border-[1px] rounded-md border-gray-700 px-4 hover:shadow-md text-gray-700 py-1'>Edit</button> */}
    </td>
    </>
  )
}


const defaultView=()=>{
  return(
    <>
     <p className={`${formStyle.h1Dashboard} px-2`}>User Management</p>
 
    <div className='flex mt-4 items-center justify-between'>
    <p  className={`${formStyle.h1Dashboard} capitalize text-lg px-2 pt-4`}>All Users</p>
      
      <div>

      <div className='flex space-x-4 text-xs text-white'>
      <div
        onClick={()=>getAlluserHandler()}
        className='bg-secondary w-28  h-[35px] flex space-x-3  rounded-md items-center justify-center
         cursor-pointer hover:bg-primary duration-300 ease-in-out'>
         <RiRefreshLine size={15}/>
         <p> Refresh</p>
        </div>
        {/* <div
        onClick={()=>setaddNewModal(true)}
        className='bg-secondary  px-4 h-[35px] flex space-x-3  rounded-md items-center justify-center
         cursor-pointer hover:bg-primary duration-300 ease-in-out'>Add New Member</div> */}
      </div>
      </div>
    </div>
    <TableSimpleUI 
    thead={['SR.No','Image','Username','Email','Phone','Status','Action']}
    data={userList.data}
    tdcells={renderTableBody}
  
    />
    </>
  )
}

  return (
   <DashboardLayout>
    {addNewModal?<CustomerForm toggleForm={()=>setaddNewModal(!addNewModal)}/>:
   
      Object.keys(selectedItem).length>0? 
      <CustomerForm toggleForm={()=>setselectedItem({})} mode="edit" data={selectedItem}/>
        :defaultView()

     }
   
   </DashboardLayout>
  )


}

export default Customer