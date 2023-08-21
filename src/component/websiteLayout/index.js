import React from 'react'
import Header from './header'
import Footer from './footer'
const WebsiteLayout = ({children}) => {
  return (
    <div>
        <Header/>
        <div className='pt-[105px]'>
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default WebsiteLayout