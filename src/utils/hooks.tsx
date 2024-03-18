import { useDispatch } from "react-redux";
import { getLocksApi } from "../api/api";
import { setLocks } from "../reducers/lockReducer";
import { store } from "../store";

export const refreshLocks = async () => {
  const reduxStore = store;
  return await getLocksApi().then((res) => reduxStore.dispatch(setLocks(res)));
};
