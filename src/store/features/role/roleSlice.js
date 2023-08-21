import { createSlice } from "@reduxjs/toolkit";

 const initialState={
    roles:[],
    isLoading:false
}


export const roleSlice= createSlice({
    name:'role',
    initialState,
    reducers:{
        setRole:(state, action)=>{
            state.roles=action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
          },
    }
})

export const {setLoading, setRole} = roleSlice.actions;

export const roleReducer= roleSlice.reducer