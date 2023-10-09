import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    home:{},
    about:[],
    contactDetails:[],
    faq:{}
}

export const webContentSlice= createSlice({
    name:'webContent',
    initialState,
    reducers:{
        setLoading:(state,action)=>{
            state.loading= action.payload
        },
        setHomeContent:(state, action)=>{
            state.home= action.payload[0]
        },
        setAboutContent:(state, action)=>{
            state.about= action.payload
        },
        setContactDetailsContent:(state, action)=>{
            state.contactDetails= action.payload
        },
        setFAQContent:(state, action)=>{
            state.faq= action.payload
        },
    }
})

export const {setLoading, setHomeContent, setContactDetailsContent, setFAQContent, setAboutContent}= webContentSlice.actions
export const webContentReducer= webContentSlice.reducer