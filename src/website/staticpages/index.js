import React ,{useState, useEffect} from 'react'
import WebsiteLayout from '../../component/websiteLayout'
import { useLocation, useParams } from 'react-router-dom'

import SideTab from './sideTab'
import TermsAndConditions from './TermsAndConditions'
import PrivacyPolicy from './privacyPolicy'
import Accessibility from './accessibility'

const StaticPoliciesPage = () => {
  const location = useLocation();

  const [activePage, setactivePage] = useState("")

  useEffect(() => {
   if(location.pathname){
    setactivePage(location.pathname)
   }
  }, [location.pathname])
  

  return (
    <WebsiteLayout>
     <div className='flex flex-col tablet:flex-row md:flex-row md:space-x-10 p-10'>
        <SideTab/>
       <div className='md:w-[70vw] space-y-2'>
       {
          activePage==="/terms-and-conditions" ? <TermsAndConditions/>:
          activePage==="/privacy-policy" ? <PrivacyPolicy/> :
          <Accessibility/>
        
        }
       </div>
     </div>
    </WebsiteLayout>
  )
}

export default StaticPoliciesPage