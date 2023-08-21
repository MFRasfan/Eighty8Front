import React from 'react'
import Header from './header'
import Sidebar from './sidebar'
import Footer from './footer'
const DashboardLayout = ({children}) => {
  return (
    <div>
        <Header/>
        <div className='flex'>
          <Sidebar/>
          <div className='py-24 px-2 md:px-10'>
            {children}
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default DashboardLayout