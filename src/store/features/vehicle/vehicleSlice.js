import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    vehicles:[]
}

export const vehicleSlice= createSlice({
    name:'vehicles',
    initialState,
    reducers:{
        setLoading:(state,action)=>{
            state.loading= action.payload
        },
        setVehicle:(state, action)=>{
            console.log("Acrion",action)
            state.vehicles= action.payload
        }
    }
})

export const {setLoading, setVehicle}= vehicleSlice.actions
export const vehicleReducer= vehicleSlice.reducer