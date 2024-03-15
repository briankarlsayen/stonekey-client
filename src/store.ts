import { combineReducers, configureStore } from "@reduxjs/toolkit";
import lockReducer from "./reducers/lockReducer";
import categoryReducer from "./reducers/categoryReducer";
import globalReducer from "./reducers/globalReducer";
import loginTypeReducer from "./reducers/loginTypeReducer";
import dialogReducer from "./reducers/dialogReducer";

const rootReducer = combineReducers({
  lock: lockReducer,
  category: categoryReducer,
  loginType: loginTypeReducer,
  dialog: dialogReducer,
  global: globalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
