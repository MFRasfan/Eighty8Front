
import { store } from "../.."
import { baseURL, url } from "../../api"
import { getAccessToken } from "../auth/authService"
import { setLoading } from "./mediaSlice"
import axios from 'axios'


export const uploadMedia=(formData, cb)=>async dispatch=>{
    try {
      setLoading(true)
         const response= await axios.post(`${baseURL}/${url.fileUpload}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      cb(response)
      setLoading(false)

    } catch (error) {
        console.log(error)
    }
}

export const deleteImage= (filename, cb)=>async dispatch=>{
  try {
    setLoading(true)
    let accessToken= await store.getState().auth.accessToken
       const response= await axios.delete(`${baseURL}/${url.fileDelete}?filename=${filename}`, {
      headers: {
        'Authorization':`Bearer ${accessToken}`
      }
    })
    cb(response)
    setLoading(false)

  } catch (error) {
      console.log(error)
  }
}