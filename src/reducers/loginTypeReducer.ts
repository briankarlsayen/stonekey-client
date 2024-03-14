import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type LoginType = {
  _id: string;
  title: string;
  code: string;
  passwordRequired: boolean;
};

export interface LoginTypes {
  list: LoginType[];
}

const initialState: LoginTypes = {
  list: [],
};

const loginTypeReducer = createSlice({
  name: "loginTypes",
  initialState,
  reducers: {
    setLoginTypes: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setLoginTypes } = loginTypeReducer.actions;
export default loginTypeReducer.reducer;
