import { combineReducers, configureStore } from "@reduxjs/toolkit";
import lockReducer from "./reducers/lockReducer";

const rootReducer = combineReducers({
  lock: lockReducer,
  // Add other reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
