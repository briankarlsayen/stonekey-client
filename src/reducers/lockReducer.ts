import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LockState {
  isOpen: boolean;
  selected?: {
    id?: string;
  };
  modalType: "add" | "view" | "edit";
  filterModal: {
    isOpen: boolean;
  };
}

const initialState: LockState = {
  isOpen: false,
  selected: null,
  modalType: "add",
  filterModal: {
    isOpen: false,
  },
};

const lockReducer = createSlice({
  name: "locks",
  initialState,
  reducers: {
    handleModal: (state, action) => {
      const { isOpen, modalType } = action.payload;
      state.isOpen = isOpen;
      state.modalType = modalType;
    },
    handleSelectCard: (state, action) => {
      state.isOpen = true;
      state.modalType = "view";
      state.selected = action.payload;
    },
    handleFilterModal: (state, action) => {
      const { isOpen } = action.payload;
      state.filterModal.isOpen = isOpen;
    },
  },
});

export const { handleModal, handleSelectCard, handleFilterModal } =
  lockReducer.actions;
export default lockReducer.reducer;
