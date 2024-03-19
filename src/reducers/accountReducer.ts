import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AccountTypes {
  id?: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  image?: string;
  accountNumber?: string;
}

const initialState: AccountTypes = {};

const loginTypeReducer = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountDetails: (state, action) => {
      const { id, firstName, lastName, emailAddress, image, accountNumber } =
        action.payload;
      state.id = id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.emailAddress = emailAddress;
      state.image = image;
      state.accountNumber = accountNumber;
    },
  },
});

export const { setAccountDetails } = loginTypeReducer.actions;
export default loginTypeReducer.reducer;
