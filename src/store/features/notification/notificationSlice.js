import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    notification:{},
}

export const notificationlice= createSlice({
    name:'notification',
    initialState,
    reducers:{
        setLoading:(state,action)=>{
            state.loading= action.payload
        },
        setNotification:(state, action)=>{
            state.notification= action.payload
           
        }
    }
})

export const {setLoading, setNotification}= notificationlice.actions
export const notificationReducer= notificationlice.reducer