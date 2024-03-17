import { useDispatch } from "react-redux";
import { getLocksApi } from "../api/api";
import { setLocks } from "../reducers/lockReducer";

export const refreshLocks = async () => {
  const dispatch = useDispatch();
  return await getLocksApi().then((res) => dispatch(setLocks(res)));
};
