import { setAccessToken,setRefreshToken, setUser, setLoading } from "./authSlice";
import { makeRequest, setAuthToken, url } from "../../api";
import { store } from "../..";
import jwtdecode from "jwt-decode";
import { toast } from 'react-toastify';


export const getAccessToken=()=>async dispatch=>{
  try {
    dispatch(setLoading(true));
    const accessToken= await store.getState().accessToken
    const refreshToken= await store.getState().refreshToken
    if(!accessToken){
      const response = await makeRequest({
        method :'post',
        url : url.refreshAccessToken,
        refreshToken : refreshToken
      })
      dispatch(setAccessToken(response.accessToken));
      console.log(11)
    }
    //decode acces token to get expiration time 
    const decodedToken = await jwtdecode(accessToken)
    const currentTime = Date.now() / 1000; // Convert to seconds

    const isTokenExpired= decodedToken.exp< currentTime;
    if(!isTokenExpired){
        return accessToken
    }else{
      const response = await makeRequest({
        method :'post',
        url : url.refreshAccessToken,
        refreshToken : refreshToken
      })
      dispatch(setAccessToken(response.accessToken));
      console.log(1)
    }
  
   
  } catch (error) {
    console.log(error)
  } finally{
    dispatch(setLoading(false));
  }
}

export const login = (body,cb) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await makeRequest({ method:'post', url:url.login,  data:body });
       
        dispatch(setAccessToken(response.accessToken));
        await  setAuthToken(response.accessToken)
        dispatch(setRefreshToken(response.refreshToken));
        dispatch(setUser(response.user));
        cb(response.user)
      } catch (error) {
          toast.error(error.error)
      } finally {
        dispatch(setLoading(false));
      }
}

export const signup = (body,cb) => async (dispatch) => {
  try {
      dispatch(setLoading(true));
      const response = await makeRequest({ method:'post', url:url.signup,  data:body });
      const {error, message}= response
      if(error){
        toast.error(error)
      }
      if(message){
        toast.info(message)
      }
      cb({message})
    } catch (error) {
      toast.error(error.error)
    } finally {
      dispatch(setLoading(false));
    }
}

export const verifyAccount = (body,cb) => async (dispatch) => {
  try {
      dispatch(setLoading(true));
      const response = await makeRequest({ method:'post', url:url.verifyAccount,  data:body });
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



export const updateUserById = (userid, body,cb) => async (dispatch) => {
  try {

    
      dispatch(setLoading(true));
      // getAccessToken()
    
      const response = await makeRequest({ method:'put',    url:`${url.userGetById}?id=${userid}`,   data:body });
      console.log(3)
     
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

export const getMyProfileData = (userid,cb) => async (dispatch) => {
  try {      
      dispatch(setLoading(true));
      const accessToken= await store.getState().auth.accessToken

      const response = await makeRequest({ 
          method:'get',
              url:`${url.userGetById}?id=${userid}`, 
            headers: { Authorization: `Bearer ${accessToken}` }
           });

           console.log(response, `${url.updateUserById}?id=${userid}`)
      dispatch(setUser(response))
      cb(response)
    } catch (error) {
      toast.error(error.error)
    } finally {
      dispatch(setLoading(false));
    }
}

export const forgetPassword = (body,cb) => async (dispatch) => {
  try {
      dispatch(setLoading(true));
      const response = await makeRequest({ method:'post', url:url.forgetPassword,  data:body });
     
      // const {error, message}= response
      //   if(message){
      //     toast.success(message)
      //   }
        cb(response)
    
    } catch (error) {
        toast.error(error.error)
    } finally {
      dispatch(setLoading(false));
    }
}

export const sendVerificationCode = (body,cb) => async (dispatch) => {
  try {
      dispatch(setLoading(true));
      const response = await makeRequest({ method:'post', url:url.resendVerificationCode,  data:body });
  
        cb(response)
    
    } catch (error) {
        toast.error(error.error)
    } finally {
      dispatch(setLoading(false));
    }
}



export const resetPassword = (body,cb) => async (dispatch) => {
  try {
      dispatch(setLoading(true));
      const response = await makeRequest({ method:'post', url:url.resetPassword,  data:body });
        cb(response)
    
    } catch (error) {
        toast.error(error.error)
    } finally {
      dispatch(setLoading(false));
    }
}