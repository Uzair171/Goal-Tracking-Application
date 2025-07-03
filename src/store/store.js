// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import goalReducer from "./goalSlice";
import uiReducer from "./uiSlice";

// 🛠️ Define persist config
const persistConfig = {
  key: "root",
  storage,
  blacklist: [], // Add slices here if you don't want them persisted
};

// 🧠 Combine reducers
const rootReducer = combineReducers({
  goals: goalReducer,
  ui: uiReducer,
});

// ♻️ Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🧪 Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// 🔁 Create persistor
export const persistor = persistStore(store);
