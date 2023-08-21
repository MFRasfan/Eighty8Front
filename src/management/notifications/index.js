import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import DashboardLayout from '../../component/dashboardLayout'
import { getAllNotifications, updateNotificationDetails } from '../../store/features/notification/notificationService'
import moment from 'moment'
import { formStyle } from '../../style/adminStyle'


const Notifications = () => {
  const [notifications, setnotifications] = useState([])
  const [count, setcount] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllNotifications(data=>{
      setnotifications(data.data)
      setcount(data.unRead)
    }))
  }, [])

  useEffect(() => {
    dispatch(updateNotificationDetails(data=>{
      if(data.message){
        dispatch(getAllNotifications(data=>{
          setnotifications(data.data)
          setcount(data.unRead)
        }))
      }
    }))
  }, [count>0])

  
  
  return (
   <DashboardLayout>
  <p className={`${formStyle.h1Dashboard} px-2`}>Notifications</p>
   
    {notifications.map((item,index)=>(
      <div className='border-gray-100 rounded-md px-5 py-3 md:w-[60vw] border-[1px]'>
        <p className='text-gray-600'>{item.message}</p>
        <p className='text-gray-400 capitalize text-sm' key={item._id}>{moment(item.createdAt).fromNow()}</p>
      </div>
    ))}
    
   </DashboardLayout>
  )
}

export default Notifications