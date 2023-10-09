import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import DashboardLayout from '../../component/dashboardLayout'
import { formStyle } from '../../style/adminStyle'
import Dropdown from 'react-dropdown';
import DatePicker from "react-datepicker";
import * as XLSX from 'xlsx';

import "react-datepicker/dist/react-datepicker.css";
import LineChart  from '../../component/charts/lineChart';
import PieChart from '../../component/charts/pieChart';
import { getInquiryDashboardStatistics, getInquirySalesStatistics} from '../../store/features/inquiry/inquiryService'
import { getUserGain } from '../../store/features/users/userService'
import { getUserList } from '../../store/features/users/userService'
import moment from 'moment';


const CUSTOMER_LIST=['Sara','Rasfan','Sumreen','Ali']
const GRAPH_TYPE=['Pie Chart','Bar Chart','Line Chart']
export const Data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234
  }
];


const Sales = () => {
  
  const [input, setinput] = useState({})
  const [fromDate, setfromDate] = useState(moment().subtract(1, 'year').toDate());
  const [toDate, settoDate] = useState(new Date());
  const dispatch= useDispatch()
  const [inquiryStats, setinquiryStats] = useState([])
  const [userGained, setUserGained] = useState([])
  const [salesYearlyStatistics, setsalesYearlyStatistics] = useState({})
  const [salesManList, setSalesManList] = useState([])
  const [downloadData, setdownloadData] = useState({})


  useEffect(() => {
   getStatistics({type:"viewAll"})
  }, [])
  
  useEffect(() => {
    if (salesManList.length <= 0) {
        getAllSalesManHandler()
    }
}, [ salesManList.length])

const  getAllSalesManHandler = () => {
  dispatch(getUserList({ role: 'sales' }, record => {

      let temp = []
      temp.push({
        label:"Select",
        value:""
      })
      for (const iterator of record.data) {
          temp.push({
              label: iterator.firstName + " " + iterator.lastName,
              value: iterator._id
          })
      }

      setSalesManList(temp)
  }))
}

  const getStatistics=(params)=>{
    let type= params.type
      let temp=[]
      if(type==="viewAll"){
        setinput({...input, assignee:{value:"", label:"Select"}})
        let obj={
          from:moment(fromDate).format('MM/DD/YYYY'),
          to:moment(toDate).add(1, 'months').format('MM/DD/YYYY'), 
        }
        dispatch(getInquirySalesStatistics(obj,(data)=>{  
          setdownloadData(data)
          temp.push({name:'Total Inquiries',quantity: data.totalInquiries})
          temp.push({name:'Active Inquiries',quantity: data.activeInquiries})
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
      }else{

        dispatch(getInquirySalesStatistics(type === "viewAll" ? null : params , (data)=>{  
          temp.push({name:'Total Inquiries',quantity: data.totalInquiries})
          temp.push({name:'Active Inquiries',quantity: data.activeInquiries})
          temp.push({name:'Pending Inquiries',quantity: data.pendingInquiries})
          temp.push({name:'Cancelled Inquiries',quantity: data.cancelledInquiries})
          temp.push({name:'Total Sales',quantity: data.completedInquiries})
          temp.push({name:'Closed Inquiries',quantity: data.closedInquiries})
          setsalesYearlyStatistics(data.statistics)
          
          setinquiryStats(temp)
        }))
      }
    
  }

  const handleExportToExcel=()=>{
    const data = downloadData;

    const sheetName = "Inquiries Statistics";
    const workbook = XLSX.utils.book_new();
    let array=[
      {
        label:"",
        value:""
      },
      {
        label:"",
        value:""
      },
      {
        label: "Total Inquiries",
        value: data.totalInquiries,
      },
      {
        label: "Active Inquiries",
        value: data.activeInquiries,
      },
      {
        label: "Pending Inquiries",
        value: data.pendingInquiries,
      },
      {
        label: "Cancelled Inquiries",
        value: data.cancelledInquiries,
      },
      {
        label: "Completed Inquiries",
        value: data.completedInquiries,
      },
      {
        label: "Closed Inquiries",
        value: data.closedInquiries,
      },
    ]
    const worksheet = XLSX.utils.json_to_sheet(array);
    const headers = [
          "Date",
          "Total Inquiries",
          "Active Inquiries",
          "Pending Inquiries",
          "Cancelled Inquiries",
          "Completed Inquiries",
          "Closed Inquiries",
        ];
  XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: { r: array.length+2, c: 0 } });

    // Add statistics data
    Object.entries(data.statistics).forEach(([date, stats], i) => {
      const row = [
        date,
        stats.total,
        stats.active,
        stats.pending,
        stats.cancelled,
        stats.completed,
        stats.closed,
      ];
      const rowIndex = i + array.length+3; // start at row 10
      XLSX.utils.sheet_add_aoa(worksheet, [row], {
        origin: { r: rowIndex, c: 0 },
      });
    });
  
    // Set column widths
    const columnWidths = [
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
    ];
    worksheet["!cols"] = columnWidths;
  
    // Set row heights
    const rowHeights = [{ hpt: 30 }, null, null, null, null, null];
    rowHeights.push(...Array(data.statistics.length).fill(null));
    worksheet["!rows"] = rowHeights.map((h) => ({ h }));
  
    // Add heading row
    const headingRow = [
      `Inquiry Statistics Report ${
        input.assignee.name ? "of " + input.assignee.name : ""
      } from ${moment(fromDate).format('Do MMMM, YYYY')} to ${moment(toDate).format('Do MMMM, YYYY')} `,
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [headingRow], {
      origin: { r: 0, c: 0 },
    });
  
    // Merge heading cells
    const headingMergeEndColumn = 6; // merge to the last column of the statistics table
    const headingMergeEndRow = 2; // merge to row 4
    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: headingMergeEndRow, c: headingMergeEndColumn } },
    ];
  
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
    XLSX.writeFile(workbook, `${sheetName}.xlsx`);
  }
  

  const handleChange=(name, value)=>{
    let obj={}
      if(name==="assignee"){
         obj={
          assignee:value.value,
          from:moment(fromDate).format('MM/DD/YYYY'),
          to:moment(toDate).add(1, 'months').format('MM/DD/YYYY')
        }
        setinput({...input, [name]:value})
       
      }
      else{
        obj={
          from:moment(fromDate).format('MM/DD/YYYY'),
          to:moment(toDate).add(1, 'months').format('MM/DD/YYYY'),
          assignee:input.assignee
        }
      }
      getStatistics(obj)
  }

  const header=()=>(
    <div className='flex items-end mb-10 w-[75vw] justify-between'>
    <div className='flex  items-end space-x-4'>
    <div
        onClick={()=>getStatistics({ type : "viewAll" })}
        className='bg-secondary  mb-6 text-sm px-4 py-3 h-[45px] flex items-center justify-center rounded-md text-white
         cursor-pointer hover:bg-primary duration-300 ease-in-out'>
          <p>View Total Sales</p>
         </div>


    </div>
    <div className='flex  items-end space-x-4'>
      <div className='mb-5' >
        <div className='mb-2'>
        <label className={`${formStyle.label} mb-2 `}>Assignee</label>
        </div>
        <Dropdown 
            options={salesManList} 
            name={'assignee'}
            style={{border:0,}}
            onChange={val=>handleChange('assignee', val)} 
            value={input.assignee} 
            placeholder="Select an option" />
      </div>

      <div>
        <div className='mb-2'>
        <label className={`${formStyle.label} mb-2 `}>From </label>
        </div>
        
          <DatePicker className={`${formStyle.input} mb-0 w-[50px] p-0`}  selected={fromDate} 
          onChange={(date) => {
            setfromDate(date)
            handleChange()
            }} />
    
      </div>
      <div >
        <div className='mb-2'>
        <label className={`${formStyle.label} mb-2 `}>To</label>
        </div>
       
        <DatePicker className={`${formStyle.input} mb-0 w-[50px] p-0`} selected={toDate} onChange={(date) => {
          settoDate(date)
          handleChange()
          }} />

       
      </div>
      <div >
      <div
        onClick={()=>handleExportToExcel()}
        className='bg-secondary  mb-6 text-sm px-4 py-3 h-[45px] flex items-center justify-center rounded-md text-white
         cursor-pointer hover:bg-primary duration-300 ease-in-out'>
          
          <p>Download</p>
         </div>

       
        

       
      </div>

    </div>
  </div>
  )

  const cards=(item,index)=>{
    return(
      <div key={item.name+index} className={`shadow-md w-[120px] h-[100px]  rounded-md flex 
      flex-col space-y-2 space-x-2 justify-center p-2`}>
        <p className='font-bold text-gray-700 '>{item.name}</p>
        <p className='font-bold text-primary text-xl'>{item.quantity}</p>
      </div>
    )
  }
  return (
   <DashboardLayout>
       <p className={`${formStyle.h1Dashboard} px-2`}>Sales Statistics</p>
        {header()}
     
       <div className='flex  space-x-5' >
        <div className='w-[800px] h-[800px]'>
        <LineChart statistics= {salesYearlyStatistics}/>
        </div>
       
        </div>
 


   </DashboardLayout>
  )
}

export default Sales