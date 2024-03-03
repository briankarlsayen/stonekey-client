import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
  deleteModal: {
    isOpen: boolean;
  };
}

const initialState: GlobalState = {
  deleteModal: {
    isOpen: false,
  },
};

const globalReducer = createSlice({
  name: "global",
  initialState,
  reducers: {
    handleDeleteModal: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      const { isOpen } = action.payload;
      state.deleteModal.isOpen = isOpen;
    },
  },
});

export const { handleDeleteModal } = globalReducer.actions;
export default globalReducer.reducer;
