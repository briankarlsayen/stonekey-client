import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CategoryState {
  list: Category[];
  selected?: {
    id?: string;
  };
  categoryModal: {
    isOpen: boolean;
    modalType: "add" | "edit";
  };
}

export interface Category {
  title: string;
}

const initialState: CategoryState = {
  list: [],
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
    setCategories: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { handleCategoryModal, setCategories } = categoryReducer.actions;
export default categoryReducer.reducer;
