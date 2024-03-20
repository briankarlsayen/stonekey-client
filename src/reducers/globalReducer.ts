import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
  deleteModal: {
    isOpen: boolean;
  };
  error?: {
    type?: "expired-jwt" | "no-token";
    text?: string;
  };
}

const initialState: GlobalState = {
  deleteModal: {
    isOpen: false,
  },
  error: null,
};

const globalReducer = createSlice({
  name: "global",
  initialState,
  reducers: {
    handleDeleteModal: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      const { isOpen } = action.payload;
      state.deleteModal.isOpen = isOpen;
    },
    setGlobalError: (
      state,
      action: PayloadAction<{
        type?: "expired-jwt" | "no-token";
        text?: string;
      }>
    ) => {
      state.error = action.payload;
    },
  },
});

export const { handleDeleteModal, setGlobalError } = globalReducer.actions;
export default globalReducer.reducer;
