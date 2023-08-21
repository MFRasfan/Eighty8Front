import {FiUsers, FiSettings} from 'react-icons/fi'
import {MdDashboard,MdOutlineSecurity,  MdOutlineFormatListNumberedRtl} from 'react-icons/md'
import {AiFillCar} from 'react-icons/ai'
import {BiWorld} from 'react-icons/bi'
import {BsBarChartLineFill} from 'react-icons/bs'
import {BiUserCircle} from 'react-icons/bi'
import {FaUserFriends} from 'react-icons/fa'
import {HiUserGroup} from 'react-icons/hi'


export const routes={
  
    'user':[
        // {
        //     name:"Dashboard",
        //     icon :MdDashboard,
        //     route:"/user"
        //   },  
        {
          name:"Profile",
          icon : BiUserCircle,
          route:"/profile"
    
        },
          {
            name:"Inquiries",
            icon :MdOutlineFormatListNumberedRtl,
            route:"/user/inquiries"
          },
       
          {
            name:"Settings",
            icon :FiSettings,
            route:"/settings"
      
          },
    ],
    'admin':[
        {
            name:"Dashboard",
            icon :MdDashboard,
            route:"/management"
          },
          {
            name:"Customers",
            icon :FaUserFriends,
            route:"/management/customer"
          }, 
          {
            name:"Inquiries",
            icon :MdOutlineFormatListNumberedRtl,
            route:"/management/inquiries"
          },
          {
            name:"Vehicles",
            icon :AiFillCar,
            route:"/management/vehicle"
          },
          {
            name:"Staff",
            icon :HiUserGroup,
            route:"/management/staff"
      
          },
          {
            name:"Sales",
            icon :BsBarChartLineFill,
            route:"/management/sales"
      
          },
          {
            name:"Website Content",
            icon :BiWorld,
            route:"/management/website-content"
      
          },
          {
            name:"Profile",
            icon : BiUserCircle,
            route:"/profile"
      
          },
          {
            name:"Settings",
            icon :FiSettings,
            route:"/settings"
      
          }
        
    ],
    'manager':[
        {
          name:"Dashboard",
          icon :MdDashboard,
          route:"/management"
        },
        {
          name:"Customers",
          icon :FaUserFriends,
          route:"/management/customer"
        }, 
        {
          name:"Inquiries",
          icon :MdOutlineFormatListNumberedRtl,
          route:"/management/inquiries"
        },
        {
          name:"Vehicles",
          icon :AiFillCar,
          route:"/management/vehicle"
        },
        {
          name:"Staff",
          icon :HiUserGroup,
          route:"/management/staff"
    
        },
        {
          name:"Sales",
          icon :BsBarChartLineFill,
          route:"/management/sales"
    
        },
        {
          name:"Website Content",
          icon :BiWorld,
          route:"/management/website-content"
    
        },
        {
          name:"Profile",
          icon : BiUserCircle,
          route:"/profile"
    
        },
        {
          name:"Settings",
          icon :FiSettings,
          route:"/settings"
    
        },
      
      ],
    'sales':[
        // {
        //     name:"Dashboard",
        //     icon :MdDashboard,
        //     route:"/sales"
        //   },
        {
            name:"Inquiries",
            icon :MdOutlineFormatListNumberedRtl,
            route:"/inquiries"
          },
        {
            name:"Profile",
            icon : BiUserCircle,
            route:"/profile"
      
          },
          {
            name:"Settings",
            icon :FiSettings,
            route:"/settings"
      
          },
    ]
}