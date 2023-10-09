import { toast } from "react-toastify"
import { store } from "../.."
import { makeRequest, url } from "../../api"
import { setLoading, setNotification } from "./notificationSlice"


export const getAllNotifications=(cb)=>async dispatch=>{
  try{
    dispatch(setLoading(true))
    const id= store.getState().auth.user._id
    const token= store.getState().auth.accessToken
    const response= await makeRequest({
      method:'get',
      url:`${url.notification}?userId=${id}`,
      headers:{'Authorization':`Bearer ${token}`}
    })
   
    if(response){

    dispatch(setNotification(response))
      cb(response)
    }
    setLoading(false)

  }catch (error) {
    toast.error(error.error)
  } finally {
    dispatch(setLoading(false));
  }

}

export const updateNotificationDetails = (id,cb)=>async dispatch =>{
  try {
    dispatch(setLoading(true));
    const id= store.getState().auth.user._id
   
    const response= await makeRequest({
      method:'get',
      url:`${url.notificationRead}?userId=${id}`
    })
   
   
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

