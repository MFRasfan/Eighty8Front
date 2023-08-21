import React ,{useState} from 'react'
import DashboardLayout from '../../component/dashboardLayout'
import About from './about'
import Contact from './contact'
import FAQ from './faq'
import Home from './home'

const StaticPageManagement = () => {
  const [activePage, setactivePage] = useState("home")

  const renderTabBar=()=>{
    return(
      <div className='flex border-b-2 w-[64vw] space-x-4 md:space-x-10 mt-10 mb-5'>
        <div
        onClick={()=>setactivePage("home")}
         className={`text-gray-500 font-semibold px-2 cursor-pointer pb-4 ${activePage==="home" && "text-primary border-b-primary border-b-4 "}`}>Home</div>
        <div
        onClick={()=>setactivePage("about")}
         className={`text-gray-500 font-semibold px-2 cursor-pointer pb-4 ${activePage==="about" && "text-primary  border-b-primary border-b-4"}`}>About</div>
        <div
        onClick={()=>setactivePage("contact")}
         className={`text-gray-500 font-semibold px-2 cursor-pointer pb-4 ${activePage==="contact" && "text-primary  border-b-primary border-b-4"}`}>Contact</div>
        {/* <div
        onClick={()=>setactivePage("faq")}
         className={`text-gray-500 font-semibold px-2 cursor-pointer pb-4 ${activePage==="faq" && "text-primary  border-b-primary border-b-4"}`}>FAQ</div> */}

      </div>
    )
  }
  return (
   <DashboardLayout>
    <p>Static Page Management</p>
    {renderTabBar()}
    { 
      activePage==="home"? <Home/>:
      activePage==="about"? <About/>:
      activePage==="contact"? <Contact/>:null
     // <FAQ/>
    }
   </DashboardLayout>
  )
}

export default StaticPageManagement