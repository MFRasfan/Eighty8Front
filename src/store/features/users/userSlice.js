import { createSlice } from "@reduxjs/toolkit";

const initialState={
    staffList:{
        data:[],
        page: 1,
        pages: 1,
        limit: 10,
        total: 0
    },
    userList:{
        data:[],
        page: 1,
        pages: 1,
        limit: 10,
        total: 0
    },
    isLoading:false,
}

export const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserList:(state, action)=>{
            state.userList=action.payload
        },
        setStaffList:(state, action)=>{
            state.staffList=action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
          },
    }

})

export const {setUserList, setStaffList, setLoading} =userSlice.actions

export const userReducer= userSlice.reducer