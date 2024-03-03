import { combineReducers, configureStore } from "@reduxjs/toolkit";
import lockReducer from "./reducers/lockReducer";
import categoryReducer from "./reducers/categoryReducer";
import globalReducer from "./reducers/globalReducer";

const rootReducer = combineReducers({
  lock: lockReducer,
  category: categoryReducer,
  global: globalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
