import { createSlice } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig= {
//     key:'auth',
//     storage,
//     whitelist: ['accessToken','refreshToken']
// }

const initialState= {
    accessToken:null,
    refreshToken:null,
    isAuthenticated: false,
    user:{},
    loading:false
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
       
      setUser:(state, action)=>{
        console.log("SET USETTTTTTTTTTTTTTTTTTTT", action)
        state.user= action.payload;
      },
      
        setAccessToken: (state, action) => {
          state.accessToken = action.payload;
          state.isAuthenticated= true;
        },
        setRefreshToken: (state, action) => {
          state.refreshToken = action.payload;
        },
       
        setLoading: (state, action) => {
          state.loading = action.payload;
        },
        clearTokens(state) {
          state.accessToken = null;
          state.refreshToken = null;
          state.isAuthenticated = false;
          state.user={}
        },
      },
    });
    
    

export const { setAccessToken, setUser, setRefreshToken, clearTokens, setLoading } = authSlice.actions;


  // export const signup = (userData) => async (dispatch) => {
  //   try {
  //     dispatch(setLoading(true));
  //     const response = await signupAPI(userData);
  //     dispatch(setUser(response.user));
  //     dispatch(setAccessToken(response.accessToken));
  //     dispatch(setRefreshToken(response.refreshToken));
  //   } catch (error) {
  //     dispatch(setError(error.message));
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };
  
export const authReducer= authSlice.reducer
