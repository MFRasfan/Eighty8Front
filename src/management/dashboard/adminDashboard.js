import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import  LineChart  from '../../component/charts/lineChart'
import PieChart from '../../component/charts/pieChart'
import DashboardLayout from '../../component/dashboardLayout'
import { formStyle } from '../../style/adminStyle'
import {getInquiryDashboardStatistics, getInquirySalesStatistics} from '../../store/features/inquiry/inquiryService'
import { getUserGain } from '../../store/features/users/userService'
import moment from 'moment';





const AdminDashboard = () => {
  const dispatch= useDispatch()
  const [inquiryStats, setinquiryStats] = useState([])
  const [userGained, setUserGained] = useState([])
  const [salesYearlyStatistics, setsalesYearlyStatistics] = useState({})
  const [fromDate, setfromDate] = useState(moment().subtract(1, 'year').toDate());
  const [toDate, settoDate] = useState(new Date());

  useEffect(() => {
    let temp=[]
    let obj={
      from:moment(fromDate).format('MM/DD/YYYY'),
      to:moment(toDate).add(1, 'months').format('MM/DD/YYYY'), 
    }
    dispatch(getInquirySalesStatistics(obj,(data)=>{  
      temp.push({name:'Total Customers',quantity: 0})
      temp.push({name:'Total Team Members',quantity: 0})
      temp.push({name:'Total Inquiries',quantity: data.totalInquiries})
      temp.push({name:'Active  Inquiries',quantity: data.activeInquiries})
      temp.push({name:'Pending Inquiries',quantity: data.pendingInquiries})
      temp.push({name:'Cancelled Inquiries',quantity: data.cancelledInquiries})
      temp.push({name:'Total Sales',quantity: data.completedInquiries})
      temp.push({name:'Closed Inquiries',quantity: data.closedInquiries})
      dispatch(getUserGain ((data2)=>{ 
        temp[0]={name:'Total Customers',quantity: data2.totalUsers}
        temp[1]={name:'Total Team Members',quantity: data2.totalTeamMembers}

        setUserGained(data2.userGainedResponse)

        setsalesYearlyStatistics(data.statistics)
      }))
      setinquiryStats(temp)
    }))
    
  },[])
  
  
  const cards=(item,index)=>{
    return(
      <div key={item.name+index} className={`shadow-md xs:w-[80%] sm:w-[200px] rounded-md flex 
      flex-col space-y-4 justify-center p-5 ${index===0 && 'mt-4 ml-4'}`}>
        <p className='font-bold text-gray-700 text-2xl'>{item.name}</p>
        <p className='font-bold text-primary text-4xl'>{item.quantity}</p>
      </div>
    )
  }
  return (
   <DashboardLayout>
     <p className={`${formStyle.h1Dashboard} px-5`}>Dashboard</p>

    <div className='flex xs:flex-col lg:flex-row'>
      <div className='flex xs:flex-col sm:flex-row xs:w-[100%] mb-16 lg:mb-0 lg:w-[35vw]  flex-wrap space-x-4 space-y-4'>
       {inquiryStats.map((item,index)=>cards(item,index))}
       {/* {cards()} */}
      </div>
      <div >
        <div className=' flex sm:flex-col md:flex-row items-center justify-center'>
          <div className='w-[20vw]'>
          <PieChart Data={userGained}/>
          </div>

        </div>
        <div className='w-[500px] mt-5'>
          <LineChart statistics= {salesYearlyStatistics}/>
        </div>
      </div>
    </div>
   </DashboardLayout>
  )
}

export default AdminDashboard