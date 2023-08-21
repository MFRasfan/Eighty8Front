import { createSlice } from "@reduxjs/toolkit";

const initialState={
    inquiryList:{
        data:[],
        page: 1,
        pages: 1,
        limit: 10,
        total: 0
    },
   
    isLoading:false,
}

export const inquirySlice= createSlice({
    name:'inquiry',
    initialState,
    reducers:{
        setInquiryList:(state, action)=>{
            state.userList=action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
          },
    }

})

export const {setInquiryList,  setLoading} = inquirySlice.actions

export const inquiryReducer= inquirySlice.reducer