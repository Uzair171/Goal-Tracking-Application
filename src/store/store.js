import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import goalReducer from "./goalSlice";
import uiReducer from "./uiSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 2, // Incremented to reset persisted state
  blacklist: [],
};

const rootReducer = combineReducers({
  goals: goalReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
