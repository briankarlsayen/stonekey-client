import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DialogType {
  open: boolean;
  title: string;
  content?: string;
  handleContinue: string;
}

export const serializeFunction = (func) => func.toString();
export const deserializeFunction = (funcString) => new Function(funcString);

const initialState: DialogType = {
  open: false,
  title: "Basic Dialog",
  content: "Basic Content",
  handleContinue: "async () => {}",
};

const loginTypeReducer = createSlice({
  name: "loginTypes",
  initialState,
  reducers: {
    setDialog: (state, action) => {
      // state.handleContinue = serializeFunction(action.payload.handleContinue);
      console.log("action", action.payload);
      state.open = action.payload.open;
      state.content = action.payload.content;
      state.title = action.payload.title;
    },
    closeDialog: (state) => {
      state.open = false;
    },
  },
});

export const { setDialog, closeDialog } = loginTypeReducer.actions;
export default loginTypeReducer.reducer;
