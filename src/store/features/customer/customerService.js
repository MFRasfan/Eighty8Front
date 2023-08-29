import { toast } from "react-toastify";
import { setLoading, setStaffList, setUserList } from "./customerSlice";
import { store } from "../..";
import { makeRequest, setAuthToken, url } from "../../api";
import { setUser } from "../auth/authSlice";

export const createCustomer=(data,cb)=>async dispatch=>{
    try {
        const accessToken= await store.getState().auth.accessToken
        setLoading(true)
        const response = await makeRequest({
            method: "post",
            url: url.createCustomer ,
            data,
            headers: { Authorization: `Bearer ${accessToken}` },
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


// export const getUserList=({role, page=1,limit=10},cb)=> async dispatch=>{
//     try{
//         dispatch(setLoading(true))
//         const accessToken= await store.getState().auth.accessToken
       
//         let _url = `${url.user}?role=${role}&page=${page}&limit=${limit}`
        
//         const response = await makeRequest({
//             method: "get",
//             url: _url,
//             headers: { Authorization: `Bearer ${accessToken}` },
//           });
//         console.log(response)
//         if(role==="user"){
//            dispatch(setUserList(response))
//         }else{
//             dispatch(setStaffList(response))
//         }
//             dispatch(setLoading(false))
//             cb && cb(response)

//     }catch(err){
//         console.log(err)
//         dispatch(setLoading(false))
//         toast.error(err.message)
//     }
// }
export const getUserList = ({ role, page = 1, limit = 10 }, cb) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const accessToken = await store.getState().auth.accessToken;

    let _url = `${url.customer}?role=${role}&page=${page}&limit=${limit}`;

    const response = await makeRequest({
      method: "get",
      url: _url,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response);

    if (role === "Walk-In" || role === "Online" || role === "Guest") {
      dispatch(setUserList(response));
    } else {
      dispatch(setStaffList(response));
    }

    dispatch(setLoading(false));
    cb && cb(response);
  } catch (err) {
    console.log(err);
    dispatch(setLoading(false));
    toast.error(err.message);
  }
};


export const updateUserById = (userid, body,cb) => async (dispatch) => {
    try {
  
      
        dispatch(setLoading(true));
        const accessToken= await store.getState().auth.accessToken

        const response = await makeRequest({ 
            method:'put',
             url:`${url.updateUserById}?id=${userid}`, 
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


  export const getUserById = (userid,cb) => async (dispatch) => {
    try {      
        dispatch(setLoading(true));
        const accessToken= await store.getState().auth.accessToken

        const response = await makeRequest({ 
            method:'get',
                url:`${url.updateUserById}?id=${userid}`, 
              headers: { Authorization: `Bearer ${accessToken}` }
             });
        cb(response)
      } catch (error) {
        toast.error(error.error)
      } finally {
        dispatch(setLoading(false));
      }
  }


  export const getUserGain=(cb)=> async dispatch=>{
    try{
        dispatch(setLoading(true))
        const accessToken= await store.getState().auth.accessToken
       
        let _url = `${url.userGain}`
        
        const response = await makeRequest({
            method: "get",
            url: _url,
            headers: { Authorization: `Bearer ${accessToken}` },
          });

        dispatch(setLoading(false))
        cb && cb(response)

    }catch(err){
        console.log(err)
        dispatch(setLoading(false))
        toast.error(err.message)
    }
}
