import { toast } from "react-toastify"
import { makeRequest, url } from "../../api"
import { getAccessToken } from "../auth/authService"
import { setLoading, setHomeContent, setFAQContent, setContactDetailsContent, setAboutContent } from "./webContentSlice"

export const addAndUpdateHome= (data, cb)=> async dispatch=>{
   try {
    dispatch(setLoading(true))
    const response = await makeRequest({
        method:'post',
        url:url.home,
        data
    })
    const {error,message}=response
    console.log(message)
    if(message){
        toast.success(message)
    }
    cb({message})
   } catch (error) {
    toast.error(error.error)
  } finally {
    dispatch(setLoading(false));
  }
}

export const getHome=(cb)=>async dispatch=>{
  console.log(111)
  try{
    dispatch(setLoading(true))
    const response= await makeRequest({
      method:'get',
      url:url.home
    })
   
    if(response){

    dispatch(setHomeContent(response))
      cb(response)
    }
    setLoading(false)

  }catch (error) {
    toast.error(error.error)
  } finally {
    dispatch(setLoading(false));
  }

}

export const addAndUpdateContact= (data, cb)=> async dispatch=>{
  try {
   dispatch(setLoading(true))
   const response = await makeRequest({
       method:'post',
       url:url.contact,
       data
   })
   const {error,message}=response
   if(message){
       toast.success(message)
   }
   cb({message})
  } catch (error) {
   toast.error(error.error)
 } finally {
   dispatch(setLoading(false));
 }
}

export const getContact=(cb)=>async dispatch=>{
 console.log(111)
 try{
   dispatch(setLoading(true))
   const response= await makeRequest({
     method:'get',
     url:url.contact
   })
  
   if(response){

     console.log(response)
   dispatch(setContactDetailsContent(response))
     cb(response)
   }
   setLoading(false)

 }catch (error) {
   toast.error(error.error)
 } finally {
   dispatch(setLoading(false));
 }

}


export const addAndUpdateAbout= (data, cb)=> async dispatch=>{
  try {
   dispatch(setLoading(true))
   const response = await makeRequest({
       method:'post',
       url:url.about,
       data
   })
   const {error,message}=response
   if(message){
       toast.success(message)
   }
   cb({message})
  } catch (error) {
   toast.error(error.error)
 } finally {
   dispatch(setLoading(false));
 }
}

export const getAbout=(cb)=>async dispatch=>{
 console.log(111)
 try{
   dispatch(setLoading(true))
   const response= await makeRequest({
     method:'get',
     url:url.about
   })
   console.log("about response------------",response)
  
   if(response){

   dispatch(setAboutContent(response))
     cb(response)
   }
   setLoading(false)

 }catch (error) {
   toast.error(error.error)
 } finally {
   dispatch(setLoading(false));
 }

}


export const addFAQ= (data, cb)=> async dispatch=>{
  try {
   dispatch(setLoading(true))
   const response = await makeRequest({
       method:'post',
       url:url.faq,
       data
   })
   const {error,message}=response
   if(message){
       toast.success(message)
   }
   cb({message})
  } catch (error) {
   toast.error(error.error)
 } finally {
   dispatch(setLoading(false));
 }
}

export const getFAQ=(cb)=>async dispatch=>{
 console.log(111)
 try{
   dispatch(setLoading(true))
   const response= await makeRequest({
     method:'get',
     url:url.faq
   })
  
   if(response){

     console.log(response)
   dispatch(setFAQContent(response))
     cb(response)
   }
   setLoading(false)

 }catch (error) {
   toast.error(error.error)
 } finally {
   dispatch(setLoading(false));
 }

}






export const updateFAQ = (id, body,cb)=>async dispatch =>{
  try {
    dispatch(setLoading(true));
    console.log('url',`${url.faq}?id=${id}`)
    const response = await makeRequest({ method:'put', url:`${url.faq}?id=${id}`,  data:body });
    console.log(response)
    const {error, message}= response
    if(message){
      toast.success(message)
    }
    cb({message})
  } catch (error) {
    toast.error(error.error)
  } finally {
    dispatch(setLoading(false));
  }

}




// export const getVehicleDetailsById = (id,cb)=>async dispatch =>{
//   try {
//     dispatch(setLoading(true));
//     const response = await makeRequest({ method:'get', url:`${url.getVehicleById}?id=${id}`});
//     cb(response)
//   } catch (error) {
//     toast.error(error.error)
//   } finally {
//     dispatch(setLoading(false));
//   }

// }