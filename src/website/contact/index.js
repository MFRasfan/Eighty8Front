import React,{useEffect, useState} from 'react'
// import Banner from './section/banner'
// import FAQ from './section/faq'
// import ContactForm from './section/form'
// import Location from './section/location'
import WebsiteLayout from '../../component/websiteLayout'
import InquiryForm from '../productDetails/section/InquiryForm'
import AboutCard from '../../component/cards/aboutCard'
import  { aboutData, contactData } from '../../data/about'
import { useDispatch, useSelector } from 'react-redux';
import { getContact} from '../../store/features/webcontent/webContentService';
import { imageURL } from '../../store/api'

const Contact = () => {
  const [contactDetails, setcontactDetails] = useState({});
  const contact = useSelector((state) => state.webContent.contactDetails);

  const [contactBannerDetails, setcontactBannerDetails] = useState({})
  const dispatch = useDispatch();

  useEffect(() => {
    if (contact.length === 0) {
      dispatch(getContact((data) =>{
        if(data[0] ){
          setcontactDetails(data[0])
            if(data[0].section1){
              
              let obj={
                title:"CONTACT US",
                heading:data[0].section1.title,
                description:data[0].section1.description,
                image: imageURL+data[0].section1.image,
                imageLeft:true
              }
      
                 setcontactBannerDetails(obj)
            }      
          }
        
    }));
      // setcontactDetails(contact);
    }else{
      setcontactDetails(contact[0]);
      if(contact[0].section1){
              
        let obj={
          title:"CONTACT US",
          heading:contact[0].section1.title,
          description:contact[0].section1.description,
          image: imageURL+contact[0].section1.image,
      //    imageLeft:true
        }

           setcontactBannerDetails(obj)
      }      

    }
  }, [dispatch, contact]);

  
  
  return (
    <WebsiteLayout>   
        {/* <AboutCard
        imageContainerStyle={`md:mt-0 bg-red-100`}
         data={contactBannerDetails}/> */}
         <div className=' my-[6%] flex  md:flex-row flex-col xs:items-center md:items-start justify-center'>
         <div className={`w-[80vw] -mt-6 md:w-[30%] sm:h-[400px] md:h-[300px]`}>
          <img src={contactBannerDetails.image} className={`h-[100%] z-10 w-[800px] rounded-lg`} />
    
      </div>
      <div className={`ml-[2%] w-[80vw]  md:w-[55%]  xs:pt-10  md:pt-4  flex flex-col items-start justify-start  `}>
     
      <p className='text-gray-500 uppercase  md:mt-0   md:text-lg font-semibold'>{contactBannerDetails.title}</p>
        <p className='xs:text-2xl md:text-4xl text-gray-700 font-bold mt-2 mb-5'>{contactBannerDetails.heading}</p>
        <p className='xs:text-sm   md:text-base text-gray-700'>{contactBannerDetails.description}</p>
      
      </div>
      

    </div>
         <InquiryForm/>
         <div className='h-[100px]'/>
    </WebsiteLayout>
  )
}

export default Contact