import { toast } from "react-toastify";
import { store } from "../..";
import { makeRequest,  url } from "../../api";
import { setInquiryList, setLoading } from "./inquirySlice";

export const createInquiry=(data,cb)=>async dispatch=>{
    try {
        setLoading(true)
        const response = await makeRequest({
            method: "post",
            url: url.inquiry ,
            data,
          });
          if(response.message){
              toast.success(response.message)
              cb()  
          }
          dispatch(setLoading(false))
        

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}


export const getInquiryList=({role, page=1,limit=10},cb)=> async dispatch=>{
    try{
        dispatch(setLoading(true))
        const accessToken= await store.getState().auth.accessToken
       const user = await store.getState()?.auth?.user
       let _url=""
       if( user && user?.role?.role==="user"){
         _url = `${url.inquiry}?page=${page}&limit=${limit}&customerId=${user._id}`
       }
       else if(user && user?.role?.role==="sales"){
        _url = `${url.inquiry}?page=${page}&limit=${limit}&salesId=${user._id}`
       }
       else{
        _url = `${url.inquiry}?page=${page}&limit=${limit}`

       }
   
        
        const response = await makeRequest({
            method: "get",
            url: _url,
            headers: { Authorization: `Bearer ${accessToken}` },
          }); 
            dispatch(setInquiryList(response))
        
            dispatch(setLoading(false))
            cb && cb(response)

    }catch(err){
        console.log(err)
        dispatch(setLoading(false))
        toast.error(err.message)
    }
}

export const updateInquiryById = (id, body,cb) => async (dispatch) => {
    try {
  
        dispatch(setLoading(true));
        const accessToken= await store.getState().auth.accessToken
        const response = await makeRequest({ 
            method:'put',
              url:`${url.inquiry}?id=${id}`, 
              data:body,
              headers: { Authorization: `Bearer ${accessToken}` }
             });
       
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


  export const getInquiryById = (id,cb) => async (dispatch) => {
    try {      
        dispatch(setLoading(true));
        const accessToken= await store.getState().auth.accessToken

        const response = await makeRequest({ 
            method:'get',
                url:`${url.inquiryGetById}?id=${id}`, 
              headers: { Authorization: `Bearer ${accessToken}` }
             });
          
        cb(response)
      } catch (error) {
        toast.error(error.error)
      } finally {
        dispatch(setLoading(false));
      }
  }


  export const getInquiryDashboardStatistics = (cb) => async (dispatch) => {
    try {      
        dispatch(setLoading(true));
        const accessToken= await store.getState().auth.accessToken
        let _url=url.report
      
        
        const response = await makeRequest({ 
          method:'get',
          url:`${_url}`, 
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        cb(response)
      } catch (error) {
        toast.error(error.error)
      } finally {
        dispatch(setLoading(false));
      }
  }
  
  export const getInquirySalesStatistics = (info,cb) => async (dispatch) => {
    try {      
        dispatch(setLoading(true));
        let _url=url.report
        const {from, to,assignee}=info
      
        if(info!==null){
        let firstFilter=true
        if(from){
          _url = `${_url}?from=${from}`
          firstFilter = false
        }
        if(to){
          _url = `${_url}${firstFilter?"?":"&"}to=${to}`
          firstFilter = false
        }
        if(assignee){
          _url = `${_url}${firstFilter?"?":"&"}assignee=${assignee}`
          firstFilter = false
        }
      }

        const accessToken= await store.getState().auth.accessToken

        const response = await makeRequest({ 
            method:'get',
                url:`${_url}`, 
                headers: { Authorization: `Bearer ${accessToken}` }
             });
          
        cb(response)
      } catch (error) {
        toast.error(error.error)
      } finally {
        dispatch(setLoading(false));
      }
  }