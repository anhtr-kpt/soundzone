import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { usersApi } from "@/api/usersApi";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
