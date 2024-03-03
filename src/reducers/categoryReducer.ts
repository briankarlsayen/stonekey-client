import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CategoryState {
  categories: Category[];
  selected?: {
    id?: string;
  };
  categoryModal: {
    isOpen: boolean;
    modalType: "add" | "edit";
  };
}

export interface Category {
  name: string;
  value: string;
}

const initialState: CategoryState = {
  categories: [],
  selected: null,
  categoryModal: {
    isOpen: false,
    modalType: "add",
  },
};

const categoryReducer = createSlice({
  name: "categories",
  initialState,
  reducers: {
    handleCategoryModal: (state, action) => {
      const { isOpen, modalType } = action.payload;
      state.categoryModal.isOpen = isOpen;
      state.categoryModal.modalType = modalType;
    },
  },
});

export const { handleCategoryModal } = categoryReducer.actions;
export default categoryReducer.reducer;
