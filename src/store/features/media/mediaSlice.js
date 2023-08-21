import { createSlice } from "@reduxjs/toolkit";


export const initialState={
    loading:false
}

export const mediaSlice= createSlice({
    name:'media',
    initialState,
    reducers:{
        setLoading:(state, action)=>{
            state.loading= action.payload
        }
    }
})

export const {setLoading} = mediaSlice.actions;

export const mediaReducer=  mediaSlice.reducer