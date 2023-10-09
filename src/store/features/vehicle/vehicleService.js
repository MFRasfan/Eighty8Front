import { toast } from "react-toastify"
import { makeRequest, url } from "../../api"
import { getAccessToken } from "../auth/authService"
import { setLoading, setVehicle } from "./vehicleSlice"

export const addVehicle= (data, cb)=> async dispatch=>{
   try {
    dispatch(setLoading(true))
    // dispatch(getAccessToken())
    const response = await makeRequest({
        method:'post',
        url:url.vehicle,
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

export const getAllVehicles=(cb)=>async dispatch=>{
  try{
    dispatch(setLoading(true))
    const response= await makeRequest({
      method:'get',
      url:url.vehicle
    })
   
    if(response){

    dispatch(setVehicle(response))
      cb(response)
    }
    setLoading(false)

  }catch (error) {
    toast.error(error.error)
  } finally {
    dispatch(setLoading(false));
  }

}

export const updateVehicleDetails = (id, body,cb)=>async dispatch =>{
  try {
    dispatch(setLoading(true));
    const response = await makeRequest({ method:'put', url:`${url.vehicle}?id=${id}`,  data:body });
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

export const getVehicleDetailsById = (id,cb)=>async dispatch =>{
  try {
    dispatch(setLoading(true));
    const response = await makeRequest({ method:'get', url:`${url.getVehicleById}?id=${id}`});
    cb(response)
  } catch (error) {
    toast.error(error.error)
  } finally {
    dispatch(setLoading(false));
  }

}


export const getAllFilteredVehicles=(filter,cb)=>async dispatch=>{
  try{
    dispatch(setLoading(true))
    const response= await makeRequest({
      method:'post',
      url:url.vehicleFilter,
      data:filter
    })
   
    if(response){
      cb(response)
    }
    setLoading(false)

  }catch (error) {
    toast.error(error.error)
  } finally {
    dispatch(setLoading(false));
  }

}


export const searchVehicles=(search,cb)=>async dispatch=>{
 
  try{
    dispatch(setLoading(true))
    const response= await makeRequest({
      method:'get',
      url:`${url.vehicleSearch}?search=${search}`
    })
   
    if(response){
     dispatch(setVehicle(response))
      cb(response)
    }
    setLoading(false)

  }catch (error) {
    toast.error(error.error)
  } finally {
    dispatch(setLoading(false));
  }

}