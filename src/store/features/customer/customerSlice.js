import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staffList: {
    data: [],
    page: 1,
    pages: 1,
    limit: 10,
    total: 0,
  },
  customerList: {
    data: [],
    page: 1,
    pages: 1,
    limit: 10,
    total: 0,
  },
  isLoading: false,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.customerList = action.payload;
    },
    setStaffList: (state, action) => {
      state.staffList = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUserList, setStaffList, setLoading } = customerSlice.actions;

export const customerReducer = customerSlice.reducer;
