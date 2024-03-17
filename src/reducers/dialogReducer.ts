import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DialogType {
  open: boolean;
}

export const serializeFunction = (func) => func.toString();
export const deserializeFunction = (funcString) => new Function(funcString);

const initialState: DialogType = {
  open: false,
};

const loginTypeReducer = createSlice({
  name: "loginTypes",
  initialState,
  reducers: {
    handleOpenDialog: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { handleOpenDialog } = loginTypeReducer.actions;
export default loginTypeReducer.reducer;
