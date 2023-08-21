import { store } from "../..";
import { makeRequest, setAuthToken, url } from "../../api";
import { setRole } from "./roleSlice";


export const fetchRoles=()=> async dispatch=>{
    try{
        console.log(111)
        const accessToken= await store.getState().auth.accessToken
        console.log(accessToken)
       
        const response = await makeRequest({
            method: "get",
            url: url.role,
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        console.log(response)
        dispatch(setRole(response))
    }catch(err){
        console.log(err)
    }
}