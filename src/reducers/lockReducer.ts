import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CategoryDetails = {
  _id?: string;
  createdAt?: Date;
  isDeleted?: boolean;
  title?: string;
  updatedAt?: Date;
  userId?: string;
};

type LoginTypeDetails = {
  _id?: string;
  code?: string;
  isDeleted?: boolean;
  title?: string;
};

export interface LockState {
  list: any[];
  isOpen: boolean;
  selected?: {
    _id: string;
    id?: string;
    category?: string;
    categoryArr?: string[];
    categoryDetails?: CategoryDetails[];
    createdAt?: Date;
    createdBy?: string;
    description?: string;
    favorite?: boolean;
    loginTypeDetails?: LoginTypeDetails;
    masterKeyId?: string;
    password?: string;
    secured?: boolean;
    title?: string;
    updatedAt?: Date;
    username?: string;
    website?: string;
  };
  modalType: "add" | "view" | "edit";
  filterModal: {
    isOpen: boolean;
  };
}

const initialState: LockState = {
  list: [],
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
    setLocks: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { handleModal, handleSelectCard, handleFilterModal, setLocks } =
  lockReducer.actions;
export default lockReducer.reducer;
