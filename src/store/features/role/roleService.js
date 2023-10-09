import { store } from "../..";
import { makeRequest, setAuthToken, url } from "../../api";
import { setRole } from "./roleSlice";


export const fetchRoles=()=> async dispatch=>{
    try{
        const accessToken= await store.getState().auth.accessToken
       
        const response = await makeRequest({
            method: "get",
            url: url.role,
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        dispatch(setRole(response))
    }catch(err){
        console.log(err)
    }
}