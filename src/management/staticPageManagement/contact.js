import React,{useState, useEffect} from 'react'
import "react-accessible-accordion/dist/fancy-example.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { formStyle } from "../../style/adminStyle";
import { BiImageAdd } from "react-icons/bi";
import { imageURL } from "../../store/api";
import Form1 from "./form1";

import {useDispatch} from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { uploadMedia,deleteImage } from "../../store/features/media/mediaService";
import { addAndUpdateContact, getContact} from "../../store/features/webcontent/webContentService"
import {AiFillCloseCircle} from "react-icons/ai"
import InputMask from 'react-input-mask'
import { validateEmail } from '../../utils/validation';
import moment from 'moment'

function Contact() {
  const [section1, setsection1] = useState( {title:"", description:"", image:"", imageFile:{}, ImagePreview:""});
  const [section2, setsection2] = useState({})
  const [imageFile, setimageFile] = useState({})
  const dispatch= useDispatch()


  useEffect(() => {
    dispatch(getContact(data=>{
      if(data && data.length>0){
        if(data[0].section1){
          setsection1(data[0].section1)
        }
        let obj= Object.assign({}, data[0])
        delete obj.section1
        setsection2(obj)
      }
    }))

  }, [dispatch])


  const submitSection1=()=>{
    try {
      if(!section1.title){
        throw "Please enter section one title"
      }
      // if(section1.title.length<10){
      //   throw "Section one title length should be min 10 characters long"
      // }
      
      // if(section1.title.length>40){
      //   throw "Section one title length should be max 40 characters long"
      // }
      if(!section1.description){
        throw "Please enter banner caption"
      }
      // if(section1.description.length<10){
      //   throw "Section one description length should be min 10 characters long"
      // }
      // if(section1.description.length>250){
      //   throw "Section one description length should be max 250 characters long"
      // }
      if(!section1.image && !section1.ImagePreview){
        throw "Please select banner image"
      }

      if(section1.ImagePreview){
       
        const formData = new FormData()
        formData.append('file', imageFile)

        dispatch(uploadMedia(formData, image=>{
          if(image.data && image.data.url){
            const obj = {}
           obj.image = image.data.url
            if(section1.title){
             obj.title= section1.title
            }
           
          
            if(section1.description ){
             obj.description = section1.description
            }

            dispatch(addAndUpdateContact({section1:obj}, res=>{
            } ))
          }
        }))
      }else{
        const obj = {}
        if(section1.title){
         obj.title= section1.title
        }
       
        if(section1.description ){
          obj.description = section1.description
        }
        dispatch(addAndUpdateContact({section1:obj}, res=>{
        } ))
      }

    


    } catch (error) {
      toast.error(error.message|| error)
      
    }
   
  }
  
  const onInputChange=(e)=>{
  
    const {name,value}=e.target
    setsection2({...section2, [name]:value})
  }
  const submitSection2=()=>{
    console.log(section2)
    try {
      if(!Boolean(section2.phonePrimary) ){
          throw "Please enter primary phone number"
      }
      // if(section2.phonePrimary.length!==14 ){
      //   throw "Primary phone length must be 14 characters long"
      //   }
      // if( section2.phoneSecondary && section2.phoneSecondary.length<14 ){
      //     throw "Secondary phone length must be 14 characters long"
      // }
      if(!section2.emailPrimary ){
        throw "Please enter primary email"
        }
        if(!validateEmail(section2.emailPrimary)){
          throw "Please enter valid primary email"
          }

          if(section2.emailSecondary && !validateEmail(section2.emailSecondary)){
            throw "Please enter valid secondary email"
            }
          if( !section2.weekdaysOpenTime ){
              throw "Please select weekdays office open time"
          }
          if( !section2.weekdaysCloseTime ){
            throw "Please select weekdays office close time"
        }
        if( section2.weekdaysOpenTime &&  section2.weekdaysCloseTime ){
            const weekopeningTime = moment(section2.weekdaysOpenTime, "HH:mm");
          const weekclosingTime = moment(section2.weekdaysCloseTime, "HH:mm");
          if (!weekclosingTime.isAfter(weekopeningTime)) {
              throw "Office close time should be greater then office open time for weekdays"
          }
          
      }
      
    if( section2.weekendOpenTime &&  !section2.weekendCloseTime ){
      throw "Please select weekend  office close time"
  }
      if( section2.weekendOpenTime &&  section2.weekendCloseTime ){
        const weekendopeningTime = moment(section2.weekdaysOpenTime, "HH:mm");
      const weekclosingTime = moment(section2.weekdaysCloseTime, "HH:mm");
      if (!weekclosingTime.isAfter(weekendopeningTime)) {
          throw "Office close time should be greater then office open time for weekends"
      }
      
  }
        if( !section2.addressTitlePrimary ){
          throw "Please enter  primary office address title"
      }
      if( !section2.addressDetailsPrimary ){
        throw "Please enter primary office address details"
    }

    if( section2.addressTitleSecondary && !section2.addressDetailsSecondary ){
      throw "Please enter secondary office address details"
  }


    const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/([a-zA-Z0-9_.-]*)\/?$/;
    if (section2.fb &&   !facebookRegex.test(section2.fb)) {
      throw "Please enter valid facebook url "
    }

    // Twitter URL validation
    const twitterRegex = /^(https?:\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9_]{1,15})\/?$/;
    if (section2.twitter && !twitterRegex.test(section2.twitter)) {
      throw "Please enter valid twitter url "
    }

    // Instagram URL validation
    const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/([a-zA-Z0-9._]{1,30})\/?$/;
    if (section2.instagram && !instagramRegex.test(section2.instagram)) {
      throw "Please enter valid instagram url "
    }

    // LinkedIn URL validation
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/([a-zA-Z0-9_-]+)\/?$/;
    if (section2.linkedIn&& !linkedinRegex.test(section2.linkedIn)) {
      throw "Please enter valid linkedIn url "
    }

    dispatch(addAndUpdateContact(section2, null))
  

    } catch (error) {
      toast.error(error.message||error)
    }
  }

  const renderContactForm=()=>{
    return(
      <div>
        <p className={`${formStyle.h1Dashboard} text-lg text-primary mt-4 mb-0 `}>Phone</p>
        <div className='flex justify-around items-center -mt-5'>
            <div className="md:w-[45%]">
                <label className={`${formStyle.label} font-bold`}>Primary Phone Number </label>
                <div className="mt-1 mb-1">
                  <InputMask
                    name={"phonePrimary"}
                    type="numeric"
                    mask="(999) 999-9999"
                    className={`${formStyle.input}`}
                    value={section2.phonePrimary}
                    onChange={onInputChange}
                    placeholder="Enter phone number"
                  />
            </div>
          </div>
          <div className="md:w-[45%]">
                <label className={`${formStyle.label} font-bold`}>Secondary Phone Number</label>
                <div className="mt-1 mb-1">
                  {/* <input
                    name={"phoneSecondary"}
                    className={`${formStyle.input}`}
                    value={section2.phone}
                    onChange={onInputChange}
                  /> */}
                  <InputMask mask="(999) 999-9999"
                  name={"phoneSecondary"}
                    className={`${formStyle.input}`}
                    value={section2.phoneSecondary}
                    onChange={onInputChange} 
                    placeholder="Enter phone number" />

            </div>
          </div>

        </div>

        <p className={`${formStyle.h1Dashboard} text-lg text-primary mt-4 mb-0 `}>Emails</p>

        <div className='flex justify-around items-center -mt-5'>

     
       <div className="md:w-[45%]">
            <label className={`${formStyle.label} font-bold`}>Primary Email </label>
            <div className="mt-1 mb-1">
              <input
                name={"emailPrimary"}
                type="email"
                className={`${formStyle.input}`}
                value={section2.emailPrimary}
                onChange={onInputChange}
                placeholder="Enter email address"
              />
         </div>
       </div>
       <div className="md:w-[45%]">
            <label className={`${formStyle.label} font-bold`}>Secondary Email</label>
            <div className="mt-1 mb-1">
            <input
              name={"emailSecondary"}  
              className={`${formStyle.input}`}
                value={section2.emailSecondary}
                onChange={onInputChange}
                type="email"
                placeholder="Enter email address"
             
              
               
              />
            
         </div>
       </div>
       </div>
       <p className={`${formStyle.h1Dashboard} text-lg text-primary mt-4 mb-0 `}>Weekdays office Timings</p>

       <div className='flex justify-around items-center -mt-5'>
            <div className="md:w-[45%]">
                <label className={`${formStyle.label} font-bold`}>Weekdays office open time </label>
                <div className="mt-1 mb-1">
                  <input
                    name={"weekdaysOpenTime"}
                    type="time"
                    
                    className={`${formStyle.input}`}
                    value={section2.weekdaysOpenTime}
                    onChange={onInputChange}
                  />
            </div>
          </div>
          <div className="md:w-[45%]">
                <label className={`${formStyle.label} font-bold`}>Weekdays office close time</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"weekdaysCloseTime"}
                    type="time"
                    className={`${formStyle.input}`}
                    value={section2.weekdaysCloseTime}
                    onChange={onInputChange}
                  />
            </div>
          </div>

        </div>

        <p className={`${formStyle.h1Dashboard} text-lg text-primary mt-4 mb-0 `}>Weekends office Timings</p>

        <div className='flex justify-around items-center -mt-5'>
            <div className="md:w-[45%]">
                <label className={`${formStyle.label} font-bold`}>Weekend office open time </label>
                <div className="mt-1 mb-1">
                  <input
                    name={"weekendOpenTime"}
                    type="time"
                    className={`${formStyle.input}`}
                    value={section2.weekendOpenTime}
                    onChange={onInputChange}
                    
                  />
            </div>
          </div>
          <div className="md:w-[45%]">
                <label className={`${formStyle.label} font-bold`}>Weekend office close time</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"weekendCloseTime"}
                    type="time"
                    className={`${formStyle.input}`}
                    value={section2.weekendCloseTime}
                    onChange={onInputChange}
                  />
            </div>
          </div>

        </div>

       <p className={`${formStyle.h1Dashboard} text-lg text-primary mt-4 mb-0 `}>Primay Office Address</p>
       <div className='flex justify-around items-center -mt-5'>
            <div className="md:w-[45%]">
                <label className={`${formStyle.label} font-bold`}>Address Title</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"addressTitlePrimary"}
                    className={`${formStyle.input}`}
                    value={section2.addressTitlePrimary}
                    onChange={onInputChange}
                    placeholder="Enter address title"
                  />
            </div>
          </div>
          <div className="md:w-[45%]">
                <label className={`${formStyle.label} font-bold`}>Address Details</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"addressDetailsPrimary"}
                    className={`${formStyle.input}`}
                    value={section2.addressDetailsPrimary}
                    onChange={onInputChange}
                    placeholder="Enter address description"
                  />
            </div>
          </div>

        </div>


        <p className={`${formStyle.h1Dashboard} text-lg text-primary mt-4 mb-0 `}>Secondary Office Address</p>
       <div className='flex justify-around items-center -mt-5'>
            <div className="md:w-[45%]">
                <label className={`${formStyle.label} font-bold`}>Address Title</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"addressTitleSecondary"}
                    className={`${formStyle.input}`}
                    value={section2.addressTitleSecondary}
                    onChange={onInputChange}
                    placeholder="Enter address title"
                  />
            </div>
          </div>
          <div className="md:w-[45%]">
                <label className={`${formStyle.label} font-bold`}>Address Details</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"addressDetailsSecondary"}
                    className={`${formStyle.input}`}
                    value={section2.addressDetailsSecondary}
                    onChange={onInputChange}
                    placeholder="Enter address description"
                  />
            </div>
          </div>

        </div>


        <p className={`${formStyle.h1Dashboard} text-lg text-primary mt-4 mb-0 `}>Social Links</p>
       <div className='flex justify-around items-center -mt-5'>
            <div className="md:w-[45%]">
                <label className={`${formStyle.label} font-bold`}>Facebook</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"fb"}
                    className={`${formStyle.input}`}
                    value={section2.fb}
                    onChange={onInputChange}
                    placeholder="Enter facebook url"
                  />
            </div>
          </div>
          <div className="md:w-[45%]">
                <label className={`${formStyle.label} font-bold`}>Twitter</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"twitter"}
                    className={`${formStyle.input}`}
                    value={section2.twitter}
                    onChange={onInputChange}
                    placeholder="Enter twitter url"
                  />
            </div>
          </div>

        </div>
        <div className='flex justify-around items-center -mt-5'>
            <div className="md:w-[45%]">
                <label className={`${formStyle.label} font-bold`}>Instagram</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"instagram"}
                    className={`${formStyle.input}`}
                    value={section2.instagram}
                    onChange={onInputChange}
                    placeholder="Enter instagram url"
                  />
            </div>
          </div>
          <div className="md:w-[45%]">
                <label className={`${formStyle.label} font-bold`}>LinkedIn</label>
                <div className="mt-1 mb-1">
                  <input
                    name={"linkedIn"}
                    className={`${formStyle.input}`}
                    value={section2.linkedIn}
                    onChange={onInputChange}
                    placeholder="Enter linkedin url"
                  />
            </div>
          </div>

        </div>
        </div>
    )
  }
  
  return (
   
      <div className="w-[64vw]">
        <Accordion>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="absolute -mt-5 ml-5 w-[55vw] flex items-center px-5 md:pr-0  justify-between">
                  <p className="text-sm md:text-base">Section 1- Main Section </p>
                  <button onClick={()=>submitSection1()} className="bg-gray-700 text-xs  text-white px-4 py-1 rounded-md">
                    Save
                  </button>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
             
            <Form1 data={section1} setimageFile={setimageFile} setData={val=>setsection1(val)} idkey={"contactcard"} />
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="absolute -mt-16 ml-5 w-[55vw] flex px-5 md:pr-0 h-[100px] items-center justify-between">
                  <p className="text-sm w-[50%] md:text-base">Section 2 - Contact Details </p>
                  <button onClick={()=>submitSection2()} className="bg-gray-700 text-xs text-white px-4 py-1 rounded-md">
                    Save
                  </button>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
          
              {renderContactForm()}
  
            </AccordionItemPanel>
          </AccordionItem>
      
        
        </Accordion>
      </div>
    
  )
}

export default Contact