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
          imageLeft:true
        }

           setcontactBannerDetails(obj)
      }      

    }
  }, [dispatch, contact]);

  
  
  return (
    <WebsiteLayout>   
        <AboutCard data={contactBannerDetails}/>
         <InquiryForm/>
    </WebsiteLayout>
  )
}

export default Contact