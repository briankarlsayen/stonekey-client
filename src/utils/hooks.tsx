import { useDispatch } from "react-redux";
import { getCategoriesApi, getLocksApi } from "../api/api";
import { setLocks } from "../reducers/lockReducer";
import { store } from "../store";
import { setCategories } from "../reducers/categoryReducer";

export const refreshLocks = async () => {
  const reduxStore = store;
  return await getLocksApi().then((res) => reduxStore.dispatch(setLocks(res)));
};

export const refreshCategories = async () => {
  const reduxStore = store;
  return await getCategoriesApi().then((res) =>
    reduxStore.dispatch(setCategories(res))
  );
};
