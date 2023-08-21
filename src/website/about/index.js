import React,{useState, useEffect} from 'react'
import WebsiteLayout from '../../component/websiteLayout'
import Banner from './section/banner'
import Statistics from './section/statistics'
import OurStory from './section/OurStory'
import WhoWeAre from './section/whoWeAre'
import WhatWedo from './section/whatWedo'
import OurInvestors from './section/OurInvestors'
import OurLeaders from './section/ourLeaders'
import LearnMore from './section/learnMore'

import { useDispatch, useSelector } from 'react-redux'
import { getAbout} from '../../store/features/webcontent/webContentService';


const AboutUs = () => {
  const dispatch = useDispatch()
  // const [aboutDetails, setaboutDetails] = useState({});
  const about = useSelector((state) => state.webContent.about);
  const [bannerDetails, setbannerDetails] = useState({})
  const [statistics, setstatistics] = useState([])
  const [whoWeAre, setwhoWeAre] = useState({})
  const [whatWedo, setwhatWedo] = useState({})
  const [ourStory, setOurStory] = useState({})


  useEffect(() => {
    if (about.length === 0) {
      dispatch(getAbout((data) =>setAboutData(data)));
    }else{
      // setaboutDetails(about[0]);
      setAboutData(about)
    }
  }, [dispatch, about]);


  const setAboutData=(data)=>{
    if(data[0] ){
      let obj = data[0]
      if(obj.section1){
        setbannerDetails(obj.section1)
      }
      if(obj.section2 && obj.section2.length>0){
        obj.section2[0]&& setOurStory(obj.section2[0])
        obj.section2[1]&& setwhoWeAre(obj.section2[1])
        obj.section2[2]&& setwhatWedo(obj.section2[2])
      }
      if(obj.section3 && obj.section3.length>0){
     setstatistics(obj.section3)
      }
      }
  }

  // console.log("sdasdasadasdadas", about ,aboutDetails)
  
  return (
    <WebsiteLayout>
        <Banner data={bannerDetails}/>
        <Statistics data={statistics}/>
        <OurStory data={ourStory}/>
        <WhoWeAre data={whoWeAre}/>
        <WhatWedo data={whatWedo}/>
        {/* 
         */}
        {/* <OurLeaders/>
        <OurInvestors/>
        <LearnMore/> */}
    </WebsiteLayout>
  )
}

export default AboutUs