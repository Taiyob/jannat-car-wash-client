import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import registerReducer from "./features/auth/registerSlice";
import loginReducer from "./features/auth/loginSlice";
import userCredentialReducer from "./features/auth/userCredentialSlice";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import { persistReducer, persistStore } from "redux-persist";

const persistUserCredentialConfig = {
  key: "userCredential",
  storage,
};
const persistedUserCrendentialReducer = persistReducer(
  persistUserCredentialConfig,
  userCredentialReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartReducer,
    register: registerReducer,
    login: loginReducer,
    userCredentialInfo: persistedUserCrendentialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    ),
});

export const persistor = persistStore(store);
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
